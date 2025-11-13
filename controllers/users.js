const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const users = await User.find({}, 'username');

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/current-user', async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { name } = req.body;
    // use user's id passed by the payload
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    if(!name) {
      return res.status(400).json({ err: 'Name is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
