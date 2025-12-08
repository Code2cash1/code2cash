const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    highlights: { type: [String], default: [] },
    projects: { type: [String], default: [] },
    imageUrl: { type: String },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Program', programSchema);
