const Application = require("../models/application");

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

module.exports = {
  getVolunteerApplications ,
  getVolunteerTotalHours
};