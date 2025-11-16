const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const { createEvent, getEventList, showEvent ,deleteEvent, updateEvent } = require('../controllers/eventController');

router.post('/', createEvent);
router.get('/', getEventList);
router.get('/:eventId', showEvent);
router.put('/:eventId', verifyToken, updateEvent);
router.delete("/:eventId", verifyToken, deleteEvent);
module.exports = router;