const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Community Service',
            'Education',
            'Environmental',
            'Health & Wellness',
            'Animal Care',
            'Arts & Culture',
            'Sports & Recreation',
            'Human Rights',
            'Disaster Relief',
            'Technology',
            'Fundraising',
            'Elderly Support',
            'Youth Empowerment',
            'Food Distribution',
            'Other',
        ],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        default: 0,
        required: true,
    },
    maxVolunteers: {
        type: Number,
        default: 0,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
    { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;