const Message = require('../models/Message');
const Callback = require('../models/Callback');
const Internship = require('../models/Internship');
const Program = require('../models/Program');

exports.getStats = async (req, res) => {
    try {
        const totalMessages = await Message.countDocuments();
        const pendingCallbacks = await Callback.countDocuments({ status: 'pending' });
        const totalInternships = await Internship.countDocuments();
        const activePrograms = await Program.countDocuments({ active: true });

        res.status(200).json({
            messages: totalMessages,
            callbacks: pendingCallbacks,
            internships: totalInternships,
            programs: activePrograms
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
    }
};
