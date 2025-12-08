const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    
    // Address Information
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true, default: 'India' }
    },
    
    // Professional Information
    experience: {
        type: String,
        required: true
    },
    currentCompany: {
        type: String,
        trim: true
    },
    currentPosition: {
        type: String,
        trim: true
    },
    
    // Education Details
    highestQualification: {
        type: String,
        required: true
    },
    yearOfPassing: {
        type: Number,
        required: true,
        min: 1950,
        max: new Date().getFullYear() + 10
    },
    university: {
        type: String,
        required: true
    },
    percentage: {
        type: String,
        required: true
    },
    
    // Skills & Expertise
    technicalSkills: [{
        type: String,
        required: true
    }],
    softSkills: [{
        type: String
    }],
    
    // Detailed Questions
    whyShouldWeHireYou: {
        type: String,
        required: true,
        maxlength: 1000
    },
    howCanYouContribute: {
        type: String,
        required: true,
        maxlength: 1000
    },
    careerGoals: {
        type: String,
        maxlength: 500
    },
    
    // Additional Information
    linkedinProfile: {
        type: String,
        trim: true
    },
    githubProfile: {
        type: String,
        trim: true
    },
    portfolioWebsite: {
        type: String,
        trim: true
    },
    expectedSalary: {
        type: String,
        required: true
    },
    noticePeriod: {
        type: String,
        required: true
    },
    
    // Resume Upload
    resumeUrl: {
        type: String,
        required: true
    },
    resumePublicId: {
        type: String,
        required: true
    },
    
    // Application Status
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
        default: 'pending'
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
