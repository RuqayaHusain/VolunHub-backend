
const express = require("express");
const router = express.Router();
const { ApplyForEvents , updateApplicationStatus } = require('../controllers/applicationController');
const verifyToken = require("../middleware/verify-token");

router.post('/', ApplyForEvents);

router.put("/:applicationId/status", verifyToken, updateApplicationStatus);

module.exports = router;
