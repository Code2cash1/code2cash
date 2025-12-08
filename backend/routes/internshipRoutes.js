const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

router.post('/', internshipController.createApplication);
router.get('/', internshipController.getAllApplications);
router.get('/:id', internshipController.getApplicationById);
router.delete('/:id', internshipController.deleteApplication);
router.patch('/:id', internshipController.updateApplicationStatus);

module.exports = router;
