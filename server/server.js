const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Hello route
app.get('/', (req, res) => {
  res.send('Hello from the backend');
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
