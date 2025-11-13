const Application = require("../models/application");
const Event = require("../models/event");

const getVolunteerApplications = async (req, res) => {
  try {
    const volunteerId = req.user.id;
    
    const applications = await Application.find({ volunteer: volunteerId })
      .populate("event", "title date location hours")

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
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const updateEvent= async (req, res) => {
  try {
    const { eventId} = req.params;        
    const organizationId = req.user._id;   


    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!event.organization.equals(organizationId)) {
      return res.status(403).json({ success: false, message: "Youre not allowed to edit this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true});

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server. Please try again later.",
    });
  }
};


const deleteEvent= async (req, res) => {
  try {
    const { eventId} = req.params;        
    const organizationId = req.user._id;   


    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!event.organization.equals(organizationId)) {
      return res.status(403).json({ success: false, message: "Youre not allowed to edit this event" });
    }


    await Event.findByIdAndDelete(eventId);
    res.json({ success: true, message: "Event deleted successfully" });
  } 
  
  catch (error) {
    console.error(error);
    
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getVolunteerApplications,
  getVolunteerTotalHours,
  updateEvent,
  deleteEvent
};