const Event = require('../models/event.js');
const Application = require('../models/application.js');
const User = require('../models/user.js');

const ApplyForEvents = async (req, res) => {
    try {
        const volunteerId = req.user._id;
        const { eventId } = req.body;

        if (req.user.role !== 'volunteer') {
            return res.status(403).json({ err: 'Only volunteers can apply for events' });
        }

        if (!eventId) {
            return res.status(400).json({ err: 'Event ID is required.' });
        }

        const selectedEvent = await Event.findById(eventId);
        if (!selectedEvent) {
            return res.status(404).json({ err: 'Event is not found' });
        }

        const existingApplication = await Application.findOne({ event: eventId, volunteer: volunteerId });
        if (existingApplication) { // checks if user already applied for the selected event
            return res.status(400).json({ err: `You've already applied for this event` });
        }

        const newApplication = await Application.create({
            event: eventId,
            volunteer: volunteerId,
            hours: selectedEvent.duration,
            status: 'pending',
        });

        res.status(201).json(newApplication);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
}


const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();
    
if (status === "completed") {
  const volunteerId = application.volunteer;
  const completedApplications = await Application.find({ volunteer: volunteerId, status: "completed" });
  const totalHours = completedApplications.reduce((sum, app) => sum + (app.hours || 0), 0);

  await User.findByIdAndUpdate(volunteerId, { totalHours });
}


    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};


module.exports = {
  ApplyForEvents,
  updateApplicationStatus,
};