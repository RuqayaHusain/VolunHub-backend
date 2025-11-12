const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verify-token');

router.get('/profile', verifyToken, userController.getUserProfile);
router.put('/volunteer/profile', verifyToken, userController.updateVolunteerProfile);

module.exports = router;