const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  id: {
    type: String,
    unique: true,
    required: [true, "ID is required"],
  },
  branch: {
    type: String,
    required: function () {
      return this.role === "student";
    },
    trim: true,
  },
  uniMailId: {
    type: String,
    unique: true,
    required: [true, "University Email ID is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["student", "department", "university"],
    required: [true, "Role is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to verify passwords
UserSchema.methods.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;