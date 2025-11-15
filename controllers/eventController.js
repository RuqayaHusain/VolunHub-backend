const User = require('../models/user.js');
const Event = require('../models/event.js');
const Application = require('../models/application.js');

const createEvent = async (req, res) => {
    try {
        if (req.user.role !== 'organization') {
            return res.status(403).json({ err: 'Only organizations are allowed to create events' });
        }
    
        const createdEvent = await Event.create({
            ...req.body, // copies all the data from the body
            owner: req.user._id,
        });
        res.status(201).json(createdEvent);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
}

const getEventList = async (req, res) => {
    try {
        const { title, category, location, startDate, endDate } = req.query;
        const filter = {};

        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // filter event where title matches the query (case-insensitive)
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' }; // filter event where category matches the query (case-insensitive)
        }

        if (location) {
            filter.location = { $regex: location, $options: 'i' }; // filter event where location matches the query (case-insensitive)
        }

        // filter event where date is within the rage in query
        if (startDate && endDate) {
            const start_date = new Date(startDate);
            const end_date = new Date(endDate);

            if (start_date > end_date) {
                return res.status(400).json({ err: 'Start date should be before end date' });
            }

            filter.date = { $gte: start_date, $lte: end_date };
        } else if (startDate) {
            const start_date = new Date(startDate);
            filter.date = { $gte: start_date };
        } else if (endDate) {
            const end_date = new Date(endDate);
            filter.date = { $lte: end_date };
        }

        if (req.user.role === 'organization') {
            // organization should only be able to see their own events
            filter.owner = req.user._id;
        }

        const events = await Event.find(filter).populate('owner').sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
}

const showEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const foundedEvent = await Event.findById(eventId).populate('owner');
        res.status(200).json(foundedEvent);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
}

const updateEvent= async (req, res) => {
  try {
    const { eventId} = req.params;        
    const organizationId = req.user._id;   


    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!event.owner.equals(organizationId)) {
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

    if (!event.owner.equals(organizationId)) {
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

const ApplyForEvents = async (req, res) => {
    try {
        const volunteerId = req.user._id;
        const { eventId } = req.params;

        if (req.user.role !== 'volunteer') {
            return res.status(403).json({ err: 'Only volunteers can apply for events' });
        }

        const selectedEvent = await Event.findById(eventId);
        if (!selectedEvent) {
            return res.status(404).json({ err: 'Event not found' });
        }

        const currentDate = new Date();
        if (selectedEvent.date < currentDate) {
            return res.status(400).json({ err: 'Event already ended' });
        }

        if (selectedEvent.maxVolunteers === 0) {
            return res.status(400).json({ err: 'Event is full' });
        }

        const existingApplication = await Application.findOne({ event: eventId, volunteer: volunteerId });
        if (existingApplication) { // checks if user already applied for the selected event
            return res.status(400).json({ err: 'You already applied for this event' });
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
};


module.exports = {
    createEvent,
    getEventList,
    showEvent,
    updateEvent,
    deleteEvent,
    ApplyForEvents,
};