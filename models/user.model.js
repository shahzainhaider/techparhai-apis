const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'], // Define possible roles
    default: 'user' // Set a default role
  }
},{timestamps:true}
);

const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;
