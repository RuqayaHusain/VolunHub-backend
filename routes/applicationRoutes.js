const express = require("express");
 const router = express.Router();
 const { ApplyForEvents } = require('../controllers/applicationController');

 router.post('/', ApplyForEvents);

 router.put("/:applicationId/status", verifyToken, updateApplicationStatus);

 
module.exports = router;
