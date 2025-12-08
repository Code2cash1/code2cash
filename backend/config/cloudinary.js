const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Debug Cloudinary Config
console.log('☁️ Cloudinary Configuration Status:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
    api_key: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing',
});

// Configure Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'internship_programs', // Creates folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, crop: "limit" }] // Auto-resize large images
    },
});

// Helper to extract public ID from URL
const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    try {
        // Example URL: http://res.cloudinary.com/demo/image/upload/v1570979139/folder/sample.jpg
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
};

const deleteFromCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl) return;

        const publicId = getPublicIdFromUrl(fileUrl);
        if (!publicId) return;

        console.log(`Deleting from Cloudinary: ${publicId}`);
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        // Don't throw error to prevent blocking main operation
        console.error('Error deleting from Cloudinary:', error);
    }
};

module.exports = { cloudinary, storage, deleteFromCloudinary };
