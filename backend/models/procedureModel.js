const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deadline: { type: Date },
  branch: { type: String, default: 'All' },
  formFields: [{
    fieldName: { type: String, required: true },
    fieldType: { type: String, enum: ['text', 'number', 'email', 'date', 'textarea', 'time', 'file', 'checkbox'], required: true },
    required: { type: Boolean, default: false },
    options: [{ type: String }],
    value: { type: mongoose.Schema.Types.Mixed },
    file: { type: String },
    id: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Procedure', procedureSchema);
