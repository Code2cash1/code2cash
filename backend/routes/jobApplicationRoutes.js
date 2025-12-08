const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getJobApplications,
    updateApplicationStatus,
    getApplicationById,
    deleteApplication,
    upload
} = require('../controllers/jobApplicationController');
const { protectAdmin } = require('../middleware/adminAuth');

const fs = require('fs');
const path = require('path');

// Public routes
router.post('/', (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
        if (err) {
            console.error('❌ Multer/Cloudinary Upload Error:', err);
            const logPath = path.join(__dirname, '../debug_error.log');
            fs.writeFileSync(logPath, `Upload Error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}\n${new Date().toISOString()}`);
            return res.status(500).json({
                success: false,
                message: 'Error uploading file',
                error: err.message
            });
        }
        next();
    });
}, applyForJob);

// Admin only routes
router.get('/job/:jobId', protectAdmin, getJobApplications);
router.get('/:id', protectAdmin, getApplicationById);
router.put('/:id/status', protectAdmin, updateApplicationStatus);
router.delete('/:id', protectAdmin, deleteApplication);

module.exports = router;
