const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        required: true,
    },
    hours: {
        type: Number,
        default: 0,
    },
    message: {
        type: String,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
    { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;