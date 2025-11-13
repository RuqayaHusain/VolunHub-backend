const express = require("express");
const { getVolunteerApplications, getVolunteerTotalHours, updateEvent, deleteEvent,viewEventApplicants  } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

router.get("/volunteer", verifyToken, getVolunteerApplications);
router.get("/volunteer/total-hours", verifyToken, getVolunteerTotalHours);
router.get("/event/:eventId/applicants", verifyToken, viewEventApplicants);
router.put("/event/:eventId", verifyToken, updateEvent);
router.delete("/event/:eventId", verifyToken, deleteEvent);

module.exports = router;
