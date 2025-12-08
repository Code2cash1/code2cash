const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching messages', error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting message', error: error.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating message', error: error.message });
    }
};
