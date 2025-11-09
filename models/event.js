const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;