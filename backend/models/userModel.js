const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define constants for the user roles
const roles = {
  STUDENT: 'student',
  DEPARTMENT: 'department',
  UNIVERSITY: 'university',
};

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // simple email validation regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(roles),
      default: roles.STUDENT, // Default role is student
    },
    branch: {
      type: String,
      required: function () {
        return this.role === roles.STUDENT; // Only students have a branch
      },
    },
    universityEmail: {
      type: String,
      required: function () {
        return this.role === roles.DEPARTMENT || this.role === roles.UNIVERSITY; // Only departments and universities need a university email
      },
      lowercase: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role === roles.DEPARTMENT; // Only departments have a department field
      },
    },
    forms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
      },
    ], // A list of forms that the user has interacted with
  },
  {
    timestamps: true, // Automatically tracks createdAt and updatedAt fields
  }
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Static method to get all students, departments, or university-level users
userSchema.statics.getUsersByRole = async function (role) {
  return this.find({ role });
};

// Static method to find user by email (useful for login or admin functionalities)
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};

// Method to update user profile information (used by users or admin)
userSchema.methods.updateProfile = async function (updates) {
  Object.assign(this, updates);
  await this.save();
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = { User, roles };
