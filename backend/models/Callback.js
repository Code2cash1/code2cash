const mongoose = require('mongoose');

const callbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    preferredTime: { type: String },
    notes: { type: String },
    status: { type: String, default: 'pending', enum: ['pending', 'contacted'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Callback', callbackSchema);
