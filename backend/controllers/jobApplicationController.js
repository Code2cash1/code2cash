const JobApplication = require('../models/jobApplicationModel');
const Job = require('../models/jobModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Debug Cloudinary Config
console.log('☁️ Cloudinary Configuration Status:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
    api_key: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing',
});

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'job_resumes',
        resource_type: 'auto', // Important for PDFs and Docs
        public_id: (req, file) => {
            // Remove extension from originalname for public_id as Cloudinary adds it or handles it
            const name = file.originalname.split('.').slice(0, -1).join('.');
            return `resume_${Date.now()}_${name}`;
        }
    }
});

const upload = multer({ storage });

// Apply for a job
const applyForJob = async (req, res) => {
    try {
        console.log('📝 Received Job Application Request');
        console.log('📂 File:', req.file ? req.file.filename : 'No file');
        console.log('📦 Body:', JSON.stringify(req.body, null, 2));

        // Explicitly extract fields to handle different parsing behaviors
        const jobId = req.body.jobId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;

        // Handle address fields (support both bracket notation and nested object)
        const street = req.body['address[street]'] || (req.body.address && req.body.address.street);
        const city = req.body['address[city]'] || (req.body.address && req.body.address.city);
        const state = req.body['address[state]'] || (req.body.address && req.body.address.state);
        const pincode = req.body['address[pincode]'] || (req.body.address && req.body.address.pincode);
        const country = req.body['address[country]'] || (req.body.address && req.body.address.country);

        const experience = req.body.experience;
        const currentCompany = req.body.currentCompany;
        const currentPosition = req.body.currentPosition;
        const highestQualification = req.body.highestQualification;
        const yearOfPassing = req.body.yearOfPassing;
        const university = req.body.university;
        const percentage = req.body.percentage;
        const technicalSkills = req.body.technicalSkills;
        const softSkills = req.body.softSkills;
        const whyShouldWeHireYou = req.body.whyShouldWeHireYou;
        const howCanYouContribute = req.body.howCanYouContribute;
        const careerGoals = req.body.careerGoals;
        const linkedinProfile = req.body.linkedinProfile;
        const githubProfile = req.body.githubProfile;
        const portfolioWebsite = req.body.portfolioWebsite;
        const expectedSalary = req.body.expectedSalary;
        const noticePeriod = req.body.noticePeriod;

        // Check if job exists and is active
        const job = await Job.findById(jobId);
        if (!job || !job.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Job not found or not active'
            });
        }

        // Check if user has already applied for this job
        const existingApplication = await JobApplication.findOne({
            jobId,
            email
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job'
            });
        }

        // Handle resume upload
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Resume is required'
            });
        }

        const application = new JobApplication({
            jobId,
            firstName,
            lastName,
            email,
            phone,
            address: {
                street,
                city,
                state,
                pincode,
                country
            },
            experience,
            currentCompany,
            currentPosition,
            highestQualification,
            yearOfPassing,
            university,
            percentage,
            technicalSkills: JSON.parse(technicalSkills || '[]'),
            softSkills: JSON.parse(softSkills || '[]'),
            whyShouldWeHireYou,
            howCanYouContribute,
            careerGoals,
            linkedinProfile,
            githubProfile,
            portfolioWebsite,
            expectedSalary,
            noticePeriod,
            resumeUrl: req.file.path,
            resumePublicId: req.file.filename
        });

        await application.save();

        // Update job application count
        await Job.findByIdAndUpdate(jobId, {
            $inc: { applicationCount: 1 }
        });

        await application.populate('jobId', 'title location type');

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting application',
            error: error.message
        });
    }
};

// Get all applications for a job (admin only)
const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status, page = 1, limit = 10 } = req.query;

        // Check if job belongs to admin
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        if (job.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view applications for this job'
            });
        }

        let filter = { jobId };
        if (status) filter.status = status;

        const skip = (page - 1) * limit;

        const applications = await JobApplication.find(filter)
            .populate('jobId', 'title location type')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await JobApplication.countDocuments(filter);

        res.status(200).json({
            success: true,
            applications,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
};

// Update application status (admin only)
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await JobApplication.findById(applicationId).populate('jobId');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check if job belongs to admin
        if (application.jobId.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this application'
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating application status',
            error: error.message
        });
    }
};

// Get application details
const getApplicationById = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id)
            .populate('jobId', 'title location type domain salary skills');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check if job belongs to admin
        if (application.jobId.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this application'
            });
        }

        res.status(200).json({
            success: true,
            application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching application',
            error: error.message
        });
    }
};

// Delete application (admin only)
const deleteApplication = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id).populate('jobId');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check if job belongs to admin
        if (application.jobId.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this application'
            });
        }

        // Delete resume from Cloudinary
        if (application.resumePublicId) {
            await cloudinary.uploader.destroy(application.resumePublicId);
        }

        await JobApplication.findByIdAndDelete(req.params.id);

        // Update job application count
        await Job.findByIdAndUpdate(application.jobId._id, {
            $inc: { applicationCount: -1 }
        });

        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting application',
            error: error.message
        });
    }
};

module.exports = {
    applyForJob,
    getJobApplications,
    updateApplicationStatus,
    getApplicationById,
    deleteApplication,
    upload
};
