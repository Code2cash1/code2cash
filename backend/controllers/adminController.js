const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: { email: admin.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const existingAdmin = await Admin.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const newAdmin = new Admin({
                email: adminEmail,
                password: process.env.ADMIN_PASSWORD
            });
            await newAdmin.save();
            console.log('👤 Default Admin Created');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};
