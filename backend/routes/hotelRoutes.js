const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    checkAvailability
} = require('../controllers/hotelController');

// Public routes
router.get('/', getHotels);
router.get('/:id', getHotel);
router.post('/check-availability', checkAvailability);

// Protected routes
router.post('/', auth, createHotel);
router.put('/:id', auth, updateHotel);

module.exports = router;