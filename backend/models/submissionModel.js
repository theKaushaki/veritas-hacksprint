const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  procedureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procedure', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [{
    id: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  }],
  status: { type: String, enum: ['submitted', 'under_review', 'approved', 'rejected', 'revision_requested'], default: 'submitted' },
  teacherComments: { type: String },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
