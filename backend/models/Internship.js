const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    program: { type: String, required: true },
    college: { type: String, required: true },
    rollNo: { type: String },
    branch: { type: String, required: true },
    course: { type: String, required: true },
    status: { type: String, default: 'applied', enum: ['applied', 'reviewed', 'accepted', 'rejected'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', internshipSchema);
