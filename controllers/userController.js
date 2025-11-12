const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found'});
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({message: 'Error fetching profile', error: error.message});
  }
};

exports.updateVolunteerProfile = async (req, res) => {
  try {
    const { name, email, phone, location, interests, availability, bio } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if (user.userType !== 'volunteer') {
        return res.status(403).json({message: 'Only volunteers can update this profile'});
    }

    if (!name || !email) {
      return res.status(400).json({message: 'Name and email are required'});
    }

    if (email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({message: 'Email already in use'});
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
        location,
        interests: Array.isArray(interests) ? interests : [],
        availability,
        bio
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Update volunteer profile error:', error);
    res.status(500).json({message: 'Error updating profile',error: error.message});
  }
};
