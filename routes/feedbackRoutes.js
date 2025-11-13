const express= require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const verifyToken = require('../middleware/verify-token');

router.post('/', verifyToken, feedbackController.createFeedback);
router.get('/organization/:organizationId', verifyToken, feedbackController.getFeedbackByOrganization);
router.get('/stats/:organizationId', verifyToken, feedbackController.getFeedbackStats);
router.get('/voluteer', verifyToken, feedbackController.getFeedbackByVolunteer);

module.exports = router;