const express = require("express");
const { getVolunteerApplications, getVolunteerTotalHours, updateEvent, deleteEvent } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

router.get("/volunteer", verifyToken, getVolunteerApplications);
router.get("/volunteer/total-hours", verifyToken, getVolunteerTotalHours);
router.put("/event/:eventId", verifyToken, updateEvent);
router.delete("/event/:eventId", verifyToken, deleteEvent);
module.exports = router;
