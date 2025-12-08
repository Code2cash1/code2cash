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

// Allowed Origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://code2cash.in',
  'https://www.code2cash.in',
  'https://code2cash.vercel.app',
  'https://code2cashbackend.vercel.app'
];

// CORS Middleware
// Use origin: true to reflect the request origin (allows credentials for any domain)
// This is safe because we can control access via authentication/tokens if needed, 
// and solves the multiple domain issue reliably.
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests explicitly for all routes
// Express 5 requires regex /.*/ instead of '*'
app.options(/.*/, cors());

app.use(express.json());

// Connect to Database and Seed
// Vercel cold start opt: connect inside request or cache.
// Logic: connectDB() checks cache. 
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
