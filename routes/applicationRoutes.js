const express = require("express");
const router = express.Router();
const { updateApplicationStatus } = require('../controllers/applicationController');

router.put("/:applicationId/status", updateApplicationStatus);

module.exports = router;