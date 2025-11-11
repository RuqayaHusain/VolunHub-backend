const express = require("express");
const { getVolunteerApplications } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

router.get("/volunteer", verifyToken, getVolunteerApplications);

module.exports = router;

