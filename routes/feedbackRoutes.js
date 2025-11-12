const express= require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const verifyToken = require('../middleware/verify-token');

router.post('/', verifyToken, feedbackController.createFeedback);

module.exports = router;