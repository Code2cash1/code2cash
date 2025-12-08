const express = require('express');
const router = express.Router();
const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getAdminJobs,
    toggleJobStatus
} = require('../controllers/jobController');
const { protectAdmin } = require('../middleware/adminAuth');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Admin only routes
router.post('/', protectAdmin, createJob);
router.get('/admin/my-jobs', protectAdmin, getAdminJobs);
router.put('/:id', protectAdmin, updateJob);
router.delete('/:id', protectAdmin, deleteJob);
router.patch('/:id/toggle-status', protectAdmin, toggleJobStatus);

module.exports = router;
