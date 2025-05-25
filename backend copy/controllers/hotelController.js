const Hotel = require('../models/Hotel');
const asyncHandler = require('express-async-handler');

exports.getAllHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find();
    
    res.status(200).json({
        status: 'success',
        results: hotels.length,
        data: {
            hotels
        }
    });
});

exports.getHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
        res.status(404);
        throw new Error('Hotel not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            hotel
        }
    });
});

exports.createHotel = asyncHandler(async (req, res) => {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            hotel: newHotel
        }
    });
});

exports.updateHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!hotel) {
        res.status(404);
        throw new Error('Hotel not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            hotel
        }
    });
});

exports.deleteHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
        res.status(404);
        throw new Error('Hotel not found');
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getHotelsByLocation = asyncHandler(async (req, res) => {
    const { lat, lng, distance = 10000, unit = 'km' } = req.query;

    if (!lat || !lng) {
        res.status(400);
        throw new Error('Please provide latitude and longitude');
    }

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    const hotels = await Hotel.find({
        location: {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }
        }
    });

    res.status(200).json({
        status: 'success',
        results: hotels.length,
        data: {
            hotels
        }
    });
});

exports.checkAvailability = asyncHandler(async (req, res) => {
    const { hotelId, roomType, checkIn, checkOut } = req.query;

    if (!hotelId || !roomType || !checkIn || !checkOut) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
        res.status(404);
        throw new Error('Hotel not found');
    }

    const room = hotel.rooms.find(r => r.type === roomType);
    
    if (!room) {
        res.status(404);
        throw new Error('Room type not found');
    }

    // Here you would typically check against bookings to determine actual availability
    // This is a simplified version
    res.status(200).json({
        status: 'success',
        data: {
            available: room.available,
            room
        }
    });
});
