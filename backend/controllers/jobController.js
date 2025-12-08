const Job = require('../models/jobModel');
const JobApplication = require('../models/jobApplicationModel');
const Admin = require('../models/Admin');

// Create a new job
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            experience,
            salary,
            location,
            skills,
            domain,
            type
        } = req.body;

        const adminId = req.admin.id;

        const job = new Job({
            title,
            description,
            experience,
            salary,
            location,
            skills,
            domain,
            type,
            postedBy: adminId
        });

        await job.save();
        await job.populate('postedBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating job',
            error: error.message
        });
    }
};

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const { domain, type, page = 1, limit = 10 } = req.query;
        
        let filter = { isActive: true };
        
        if (domain) filter.domain = domain;
        if (type) filter.type = type;

        const skip = (page - 1) * limit;
        
        const jobs = await Job.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments(filter);

        res.status(200).json({
            success: true,
            jobs,
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
            message: 'Error fetching jobs',
            error: error.message
        });
    }
};

// Get job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching job',
            error: error.message
        });
    }
};

// Update job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check if admin owns this job
        if (job.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this job'
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('postedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating job',
            error: error.message
        });
    }
};

// Delete job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check if admin owns this job
        if (job.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this job'
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        // Also delete all applications for this job
        await JobApplication.deleteMany({ jobId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting job',
            error: error.message
        });
    }
};

// Get jobs posted by current admin
const getAdminJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const adminId = req.admin.id;
        
        const skip = (page - 1) * limit;
        
        const jobs = await Job.find({ postedBy: adminId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments({ postedBy: adminId });

        res.status(200).json({
            success: true,
            jobs,
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
            message: 'Error fetching admin jobs',
            error: error.message
        });
    }
};

// Toggle job active status
const toggleJobStatus = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check if admin owns this job
        if (job.postedBy.toString() !== req.admin.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this job'
            });
        }

        job.isActive = !job.isActive;
        await job.save();

        res.status(200).json({
            success: true,
            message: `Job ${job.isActive ? 'activated' : 'deactivated'} successfully`,
            job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating job status',
            error: error.message
        });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getAdminJobs,
    toggleJobStatus
};
