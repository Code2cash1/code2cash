const ReissueRequest = require('../models/ReissueRequest');

// Create reissue request
exports.createReissueRequest = async (req, res) => {
    try {
        const { certificateId } = req.body;

        // Check if a pending request already exists
        const existingRequest = await ReissueRequest.findOne({
            certificateId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'A reissue request for this certificate is already pending.'
            });
        }

        const newRequest = new ReissueRequest(req.body);
        await newRequest.save();

        res.status(201).json({
            success: true,
            message: 'Reissue request submitted successfully',
            data: newRequest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating reissue request',
            error: error.message
        });
    }
};

// Get all reissue requests
exports.getAllReissueRequests = async (req, res) => {
    try {
        const requests = await ReissueRequest.find().sort({ requestDate: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reissue requests',
            error: error.message
        });
    }
};

// Update reissue request status
exports.updateReissueStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await ReissueRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating status',
            error: error.message
        });
    }
};

// Delete reissue request
exports.deleteReissueRequest = async (req, res) => {
    try {
        await ReissueRequest.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Request deleted' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting request',
            error: error.message
        });
    }
};
