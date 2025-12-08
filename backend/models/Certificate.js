const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateId: { type: String, required: true, unique: true },
    internName: { type: String, required: true },
    email: { type: String, required: true },
    domain: { type: String, required: true },
    duration: { type: String, required: true },
    college: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    issueDate: { type: Date, default: Date.now },
    qrCode: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
