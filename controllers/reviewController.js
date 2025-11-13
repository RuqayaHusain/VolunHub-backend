const Reveiw = require('../models/review');
const Event = require('../models/event');

const createReview = async (req, res) => {
    try {
        const { rating, comment, event } = req.body;

        if (!rating) {
            return res.status(400).json({ err: 'rating is required' });
        }

        if (!comment) {
            return res.status(400).json({ err: 'comment is required' });
        }

        if (!event) {
            return res.status(400).json({ err: 'event is required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ err: 'Rating must be between 1 and 5' });
        }

        const foundedEvent = await Event.findById(event);

        if (!foundedEvent) {
            return res.status(404).json({ err: 'Event not found' });
        }

        const review = await Reveiw.create({
            rating,
            comment,
            event,
            volunteer: req.user._id,
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' });
    }
};

module.exports = {
    createReview,
};