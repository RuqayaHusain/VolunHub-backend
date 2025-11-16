

const Application = require("../models/application");
const Event = require("../models/event");

const getVolunteerApplications = async (req, res) => {
  try {
    const volunteerId = req.user._id;
    
    const applications = await Application.find({ volunteer: volunteerId })
.populate("event", "title date location duration")

    res.json({
      success: true,
      count: applications.length,
      applications, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getVolunteerTotalHours = async (req, res) => {
  try {
    const volunteerId = req.user._id
    const applications = await Application.find({ volunteer: volunteerId, status: 'completed' });
    const totalHours = applications.reduce((sum, app) => sum + (app.hours || 0), 0);
    res.json({ success: true, totalHours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Serve  r error', error });
  }
};


const viewEventApplicants = async (req, res) => {
  try {
    const organizationId = req.user._id;
    const { eventId} = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    
    if (!event.owner.equals(organizationId)) {
      return res.status(403).json({ success: false, message: "You’re not allowed to see applicants for this event" });
    }

    const applications = await Application.find({ event: eventId })
      .populate("volunteer", "name email");

    res.status(200).json({
      success: true,
      count:applications.length,
      applicants: applications,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const getOrganizationApplications = async (req, res) => {
  try {
    const organizationId = req.user._id;

    const events = await Event.find({ owner: organizationId }).select("_id title");

    const eventIds = events.map(e => e._id);

    const applications = await Application.find({ event: { $in: eventIds } })
      .populate('event', 'title date location duration') 
      .populate('volunteer', 'name email totalHours'); 

    res.json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = {
  getVolunteerApplications,
  getVolunteerTotalHours,
  viewEventApplicants,
  getOrganizationApplications  
};
