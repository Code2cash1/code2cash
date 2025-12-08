const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    domain: {
        type: String,
        required: true,
        enum: ['Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Other']
    },
    type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applicationCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

jobSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Job', jobSchema);
