const Certificate = require('../models/Certificate');

// Generate unique certificate ID
const generateCertificateId = () => {
    const prefix = 'C2C';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
};

// Create new certificate
exports.createCertificate = async (req, res) => {
    try {
        const certificateId = generateCertificateId();
        const certificateData = {
            ...req.body,
            certificateId
        };

        const newCertificate = new Certificate(certificateData);
        await newCertificate.save();

        res.status(201).json({
            success: true,
            message: 'Certificate generated successfully',
            data: newCertificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating certificate',
            error: error.message
        });
    }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching certificates',
            error: error.message
        });
    }
};

// Verify certificate by ID
exports.verifyCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        const certificate = await Certificate.findOne({ certificateId: certificateId.toUpperCase() });

        if (!certificate) {
            return res.status(404).json({
                success: false,
                verified: false,
                message: 'Certificate not found'
            });
        }

        res.status(200).json({
            success: true,
            verified: true,
            message: 'Certificate is valid',
            data: certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying certificate',
            error: error.message
        });
    }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
    try {
        await Certificate.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Certificate deleted' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting certificate',
            error: error.message
        });
    }
};
