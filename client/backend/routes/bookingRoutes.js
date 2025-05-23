const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect, restrictTo } = require('../middleware/auth');

router.use(protect); // All booking routes require authentication

router
    .route('/')
    .get(bookingController.getMyBookings)
    .post(bookingController.createBooking);

router.get('/my-bookings', bookingController.getMyBookings);
router.get('/booking/:id', bookingController.getBooking);
router.patch('/cancel/:id', bookingController.cancelBooking);

// Admin only routes
router.use(restrictTo('admin'));
router.get('/all', bookingController.getAllBookings);
router.patch('/update-status/:id', bookingController.updateBookingStatus);
router.get('/stats', bookingController.getBookingStats);

module.exports = router;
