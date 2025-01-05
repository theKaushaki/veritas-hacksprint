const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: function () {
      return this.role === 'student';
    },
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['student', 'department', 'university'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.verifyPassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
