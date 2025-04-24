const Hotel = require('../models/Hotel');

// Get all hotels with filtering
exports.getHotels = async (req, res) => {
    try {
        const { radius, rating, maxPrice } = req.query;
        let query = {};

        if (radius) query.distanceFromVenue = { $lte: Number(radius) };
        if (rating) query.rating = { $gte: Number(rating) };
        if (maxPrice) {
            query['rooms.price'] = { $lte: Number(maxPrice) };
        }

        const hotels = await Hotel.find(query).sort({ distanceFromVenue: 1 });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hotel
exports.getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a hotel
exports.createHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        Object.assign(hotel, req.body);
        const updatedHotel = await hotel.save();
        res.json(updatedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Check room availability
exports.checkAvailability = async (req, res) => {
    try {
        const { hotelId, roomType, checkIn, checkOut, guests } = req.body;
        
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const room = hotel.rooms.find(r => r.type === roomType);
        if (!room) {
            return res.status(404).json({ message: 'Room type not found' });
        }

        // Check if room capacity meets guest count
        if (room.capacity < guests) {
            return res.status(400).json({ 
                message: 'Room capacity insufficient for guest count'
            });
        }

        // In a real application, you would check bookings table for actual availability
        // This is a simplified version
        const isAvailable = room.available > 0;

        res.json({
            available: isAvailable,
            remainingRooms: room.available,
            price: room.price
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};