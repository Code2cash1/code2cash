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
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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
