const mongoose = require('mongoose');
const { roles } = require('./userModel');

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipientType: { type: String, enum: [roles.DEPARTMENT, roles.STUDENT, roles.UNIVERSITY], required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  link: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
