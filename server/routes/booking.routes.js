const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect, restrictTo } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getUserBookings);
router.get('/booking/:id', bookingController.getBooking);
router.patch('/cancel/:id', bookingController.cancelBooking);

// Admin-only routes
router.get('/all', restrictTo('admin'), bookingController.getAllBookings);
router.get('/stats', restrictTo('admin'), bookingController.getBookingStats);
router.patch('/update-status/:id', restrictTo('admin'), bookingController.updateBookingStatus);

module.exports = router; 