const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const { seedAdmin } = require('./controllers/adminController');
const { seedPerks } = require('./controllers/perkController');
const { seedPrograms } = require('./controllers/programController');
// fs removed for Vercel EROFS compatibility

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

// Allowed Origins - Production only
const allowedOrigins = [
  'https://code2cash.in',
  'https://www.code2cash.in'
];

// CORS Middleware - Strict production-only origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.error('❌ CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests explicitly for all routes
// Express 5 requires regex /.*/ instead of '*'
app.options(/.*/, cors());

app.use(express.json());

// Database Connection Middleware
// Fix for 500 Errors on Vercel Cold Starts:
// Since bufferCommands is false, we MUST ensure DB is connected before handling the request.
app.use(async (req, res, next) => {
  try {
    // Only wait if not already connected
    if (require('mongoose').connection.readyState !== 1) {
      console.log('⏳ Waiting for DB connection...');
      await connectDB();
      console.log('✅ DB Connected');
    }
    next();
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Service Unavailable'
    });
  }
});

// Seed Logic (Still runs in background, but doesn't block request if strictly not needed, 
// though logically we might want it. leaving as is for now as it's promise-based)
connectDB().then(() => {
  // Seeding might not be ideal on every cold start in production, 
  // but keeping business logic as is for now.
  // Consider moving this to a dedicated endpoint or checking DB state.
  seedAdmin().catch(err => console.log('Seed Admin Error:', err.message));
  seedPerks().catch(err => console.log('Seed Perks Error:', err.message));
  seedPrograms().catch(err => console.log('Seed Programs Error:', err.message));
}).catch(err => console.error("DB Init Error:", err));


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

// Health Check Route
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
      CLOUDINARY: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'
    },
    database: {
      status: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
      readyState: mongoose.connection.readyState
    }
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Code2Cash Backend is Running');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Global Error Handler:', err);
  // Removed fs logging to prevent EROFS
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start Server (Only for local dev)
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
