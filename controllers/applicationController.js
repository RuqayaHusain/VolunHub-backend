const Application = require('../models/application.js');
const User = require('../models/user.js');



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
  updateApplicationStatus,
};