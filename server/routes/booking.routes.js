const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authController = require('../controllers/auth.controller');

// All routes are protected
router.use(authController.protect);

router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getUserBookings);
router.get('/:id', bookingController.getBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router; 