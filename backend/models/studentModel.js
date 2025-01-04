const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, unique: true, required: true },
  branch: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  allowEmails: { type: Boolean, default: true},
  password: { type: String, required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
