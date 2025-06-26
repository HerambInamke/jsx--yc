const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const errorHandler = require('./middleware/error');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://yourconcert.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Hello route
app.get('/', (req, res) => {
  res.send('Hello from the backend');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/concerts', require('./routes/event.routes'));
app.use('/api/v1/bookings', require('./routes/booking.routes'));
app.use('/api/v1/hotels', require('./routes/hotel.routes'));
app.use('/api/v1/packages', require('./routes/package.routes'));
app.use('/api/v1/payments', require('./routes/payment.routes'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅MongoDB Connected'))
.catch(err => console.error('❌MongoDB Connection Error:', err));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`✅Server running at http://localhost:${PORT}`);
});
