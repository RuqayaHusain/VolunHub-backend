const express = require("express");
 const router = express.Router();
 const {  updateApplicationStatus } = require('../controllers/applicationController');
  const { ApplyForEvents  } = require('../controllers/eventController');

const verifyToken = require("../middleware/verify-token");

 router.post('/', ApplyForEvents);

 router.put("/:applicationId/status", verifyToken, updateApplicationStatus);

module.exports = router;