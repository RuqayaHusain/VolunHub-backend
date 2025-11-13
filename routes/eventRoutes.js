const express = require('express');
const router = express.Router();
const { createEvent, getEventList, showEvent } = require('../controllers/eventController');

router.post('/', createEvent);
router.get('/', getEventList);
router.get('/:eventId', showEvent);

module.exports = router;