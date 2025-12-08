const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const { seedAdmin } = require('./controllers/adminController');
const { seedPerks } = require('./controllers/perkController');
const { seedPrograms } = require('./controllers/programController');
const fs = require('fs');
const path = require('path');

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const statsRoutes = require('./routes/statsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const callbackRoutes = require('./routes/callbackRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const programRoutes = require('./routes/programRoutes');
const perkRoutes = require('./routes/perkRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const reissueRoutes = require('./routes/reissueRoutes');
const jobRoutes = require('./routes/jobRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allowed domains
const allowedDomains = [
  'https://code2cash.in',
  'https://www.code2cash.in',
  'https://code2cash.vercel.app'
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return next();
  
  // Check if the origin is allowed
  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  }
  
  next();
});
app.use(express.json());

// Connect to Database and Seed Admin
connectDB().then(() => {
  seedAdmin();
  seedPerks();
  seedPrograms();
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/callback', callbackRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/perks', perkRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/reissue', reissueRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-applications', jobApplicationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Global Error Handler:', err);
  try {
    fs.appendFileSync(path.join(__dirname, 'backend_error.log'), `[${new Date().toISOString()}] Global Error: ${err.message}\nStack: ${err.stack}\n\n`);
  } catch (e) { console.error('Failed to write to error log', e); }

  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: err.message
  });
});

// Start Server configuration for Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
