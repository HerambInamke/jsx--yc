const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { protect, restrictTo } = require('../middleware/auth');

router
    .route('/')
    .get(hotelController.getAllHotels)
    .post(protect, restrictTo('admin'), hotelController.createHotel);

router
    .route('/:id')
    .get(hotelController.getHotel)
    .patch(protect, restrictTo('admin'), hotelController.updateHotel)
    .delete(protect, restrictTo('admin'), hotelController.deleteHotel);

router.get('/search/location', hotelController.getHotelsByLocation);
router.get('/search/availability', hotelController.checkAvailability);

module.exports = router;
