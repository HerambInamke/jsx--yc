const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    createBooking,
    getUserBookings,
    getBooking,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/bookingController');

// All routes are protected as they deal with user data
router.post('/', auth, createBooking);
router.get('/user/:userId', auth, getUserBookings);
router.get('/:id', auth, getBooking);
router.put('/:id/status', auth, updateBookingStatus);
router.put('/:id/cancel', auth, cancelBooking);

module.exports = router;