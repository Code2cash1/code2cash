const Internship = require('../models/Internship');

exports.createApplication = async (req, res) => {
    try {
        const newInternship = new Internship(req.body);
        await newInternship.save();
        res.status(201).json({ success: true, message: 'Application submitted', data: newInternship });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error submitting application', error: error.message });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Internship.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching applications', error: error.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await Internship.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching application', error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        await Internship.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting application', error: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Internship.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating application', error: error.message });
    }
};
