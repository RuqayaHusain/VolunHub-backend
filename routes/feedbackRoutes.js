const express= require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const verifyToken = require('../middleware/verify-token');

router.post('/', verifyToken, feedbackController.createFeedback);
router.get('/organization/:organizationId', verifyToken, feedbackController.getFeedbackByOrganization);
module.exports = router;