const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const roles = {
  STUDENT: 'student',
  DEPARTMENT: 'department',
  UNIVERSITY: 'university',
};


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
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
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
      default: roles.STUDENT,
    },
    branch: {
      type: String,
      required: function () {
        return this.role === roles.STUDENT;
      },
    },
    email: {
      type: String,
      required: function () {
        return this.role === roles.DEPARTMENT || this.role === roles.UNIVERSITY;
      },
      lowercase: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role === roles.DEPARTMENT;
      },
    },
    forms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
      },
    ],
  },
  {
    timestamps: true,
  }
);


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


userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};


userSchema.statics.getUsersByRole = async function (role) {
  return this.find({ role });
};


userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};


userSchema.methods.updateProfile = async function (updates) {
  Object.assign(this, updates);
  await this.save();
};


const User = mongoose.model('User', userSchema);

module.exports = { User, roles, userRoles: roles };
