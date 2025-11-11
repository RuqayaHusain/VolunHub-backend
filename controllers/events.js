const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Event = require('../models/event.js');

router.post('/', async (req, res) => {
    try {
        if (req.user.role !== 'organization') {
            return res.status(403).json({ err: `Only organizations are allowed to create events ${req.user.role}` });
        }

        const createdEvent = await Event.create({
            ...req.body, // copies all the data from the body
            owner: req.user._id,
        });
        res.status(201).json(createdEvent);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}).populate('owner').sort({ createdAt: 'desc' });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
});

module.exports = router;