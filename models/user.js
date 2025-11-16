const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['volunteer', 'organization'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String
  },
  profilePicture: {
    type: String
  },
  totalHours: {       
    type: Number,
    default: 0
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
