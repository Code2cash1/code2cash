const Callback = require('../models/Callback');

exports.createCallback = async (req, res) => {
    try {
        const newCallback = new Callback(req.body);
        await newCallback.save();
        res.status(201).json({ success: true, message: 'Callback saved', data: newCallback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving callback', error: error.message });
    }
};

exports.getAllCallbacks = async (req, res) => {
    try {
        const callbacks = await Callback.find().sort({ createdAt: -1 });
        res.status(200).json(callbacks);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching callbacks', error: error.message });
    }
};

exports.deleteCallback = async (req, res) => {
    try {
        await Callback.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Callback deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting callback', error: error.message });
    }
};

exports.updateCallback = async (req, res) => {
    try {
        await Callback.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating callback', error: error.message });
    }
};
