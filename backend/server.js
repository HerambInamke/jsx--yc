const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const corsMiddleware = require('./middleware/cors');
const { errorHandler } = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimit');
const authRoutes = require('./routes/authRoutes');
const concertRoutes = require('./routes/concertRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(hpp()); // Prevent parameter pollution
app.use(limiter); // Rate limiting

// Regular middleware
app.use(corsMiddleware);

// Parse JSON bodies for all routes except /api/payments/webhook
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payments/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with enhanced error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

// Improved error handling for MongoDB connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/concerts', concertRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// Handle 404 errors
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated!');
        mongoose.connection.close(false, () => {
            process.exit(0);
        });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});