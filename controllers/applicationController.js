// const Event = require('../models/event.js');
// const Application = require('../models/application.js');

// const ApplyForEvents = async (req, res) => {
//     try {
//         const volunteerId = req.user._id;
//         const { eventId } = req.body;

//         if (req.user.role !== 'volunteer') {
//             return res.status(403).json({ err: 'Only volunteers can apply for events' });
//         }

//         if (!eventId) {
//             return res.status(400).json({ err: 'Event ID is required.' });
//         }

//         const selectedEvent = await Event.findById(eventId);
//         if (!selectedEvent) {
//             return res.status(404).json({ err: 'Event is not found' });
//         }

//         const existingApplication = await Application.findOne({ event: eventId, volunteer: volunteerId });
//         if (existingApplication) { // checks if user already applied for the selected event
//             return res.status(400).json({ err: `You've already applied for this event` });
//         }

//         const newApplication = await Application.create({
//             event: eventId,
//             volunteer: volunteerId,
//             hours: selectedEvent.duration,
//             status: 'pending',
//         });

//         res.status(201).json(newApplication);
//     } catch (err) {
//         res.status(500).json({ err: 'Something went wrong!' });
//     }
// }

// module.exports = {
//     ApplyForEvents,
// };