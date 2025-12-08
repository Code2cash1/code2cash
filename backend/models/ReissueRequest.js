const mongoose = require('mongoose');

const reissueRequestSchema = new mongoose.Schema({
    certificateId: { type: String, required: true },
    internName: { type: String, required: true },
    email: { type: String, required: true },
    domain: { type: String },
    college: { type: String },
    duration: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    issueDate: { type: Date },
    reason: { type: String, default: 'Certificate reissue requested' },
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
    requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReissueRequest', reissueRequestSchema);
