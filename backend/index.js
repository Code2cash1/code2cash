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
// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.code2cash.in',
  'https://code2cash.vercel.app',
  /^https:\/\/code2cash(-\w+)?\.vercel\.app$/,
  /^https:\/\/code2cash(-\w+)?-code2cashs-projects\-[a-z0-9]+\.vercel\.app$/,
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowedOrigins array
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed || !origin) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
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
