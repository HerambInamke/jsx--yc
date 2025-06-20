const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotel);

// Protected/Admin
router.post('/', protect, restrictTo('admin'), hotelController.createHotel);
router.patch('/:id', protect, restrictTo('admin'), hotelController.updateHotel);
router.delete('/:id', protect, restrictTo('admin'), hotelController.deleteHotel);

module.exports = router; 