const express = require('express');
const router = express.Router();
const { createReview, getEventReviews } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/event/:eventId', getEventReviews);

module.exports = router;