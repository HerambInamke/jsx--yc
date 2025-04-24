const Booking = require('../models/Booking');
const Concert = require('../models/Concert');
const Hotel = require('../models/Hotel');
const Package = require('../models/Package');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const {
            type,
            concertId,
            hotelId,
            packageId,
            ticketType,
            roomType,
            checkIn,
            checkOut,
            numberOfGuests,
            user
        } = req.body;

        let totalAmount = 0;

        // Calculate total amount based on booking type
        switch (type) {
            case 'concert':
                const concert = await Concert.findById(concertId);
                if (!concert) {
                    return res.status(404).json({ message: 'Concert not found' });
                }
                totalAmount = concert.pricing[ticketType];
                break;

            case 'hotel':
                const hotel = await Hotel.findById(hotelId);
                if (!hotel) {
                    return res.status(404).json({ message: 'Hotel not found' });
                }
                const room = hotel.rooms.find(r => r.type === roomType);
                if (!room) {
                    return res.status(404).json({ message: 'Room type not found' });
                }
                const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
                totalAmount = room.price * nights;
                break;

            case 'package':
                const package = await Package.findById(packageId);
                if (!package) {
                    return res.status(404).json({ message: 'Package not found' });
                }
                totalAmount = package.price;
                break;

            default:
                return res.status(400).json({ message: 'Invalid booking type' });
        }

        const booking = new Booking({
            user,
            type,
            concert: concertId,
            hotel: hotelId,
            package: packageId,
            ticketType,
            roomType,
            checkIn: checkIn ? new Date(checkIn) : undefined,
            checkOut: checkOut ? new Date(checkOut) : undefined,
            numberOfGuests,
            totalAmount
        });

        const newBooking = await booking.save();

        // Update availability (in a real application, this should be handled in a transaction)
        if (type === 'concert') {
            await Concert.findByIdAndUpdate(concertId, {
                $inc: { [`availableSeats.${ticketType}`]: -1 }
            });
        } else if (type === 'hotel') {
            await Hotel.findOneAndUpdate(
                { _id: hotelId, 'rooms.type': roomType },
                { $inc: { 'rooms.$.available': -1 } }
            );
        } else if (type === 'package') {
            await Package.findByIdAndUpdate(packageId, {
                $inc: { available: -1 }
            });
        }

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId })
            .populate('concert')
            .populate('hotel')
            .populate('package')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single booking
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('concert')
            .populate('hotel')
            .populate('package');
            
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookingStatus = status;
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Add cancellation logic here (e.g., refund processing)
        booking.bookingStatus = 'cancelled';
        const updatedBooking = await booking.save();

        // Restore availability
        if (booking.type === 'concert') {
            await Concert.findByIdAndUpdate(booking.concert, {
                $inc: { [`availableSeats.${booking.ticketType}`]: 1 }
            });
        } else if (booking.type === 'hotel') {
            await Hotel.findOneAndUpdate(
                { _id: booking.hotel, 'rooms.type': booking.roomType },
                { $inc: { 'rooms.$.available': 1 } }
            );
        } else if (booking.type === 'package') {
            await Package.findByIdAndUpdate(booking.package, {
                $inc: { available: 1 }
            });
        }

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};