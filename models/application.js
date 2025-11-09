const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({

});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;