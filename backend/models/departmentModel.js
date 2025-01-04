const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    employeeId: { type: String, unique: true, required: true },
    department: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    allowEmails: { type: Boolean, default: true },
    password: { type: String, required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Faculty', departmentSchema);
