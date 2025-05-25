const Booking = require('../models/Booking');
const Package = require('../models/Package');
const Concert = require('../models/Concert');
const Hotel = require('../models/Hotel');
const asyncHandler = require('express-async-handler');

exports.createBooking = asyncHandler(async (req, res) => {
    const {
        packageId,
        concertId,
        hotelId,
        startDate,
        endDate,
        numberOfPeople,
        paymentMethod,
        specialRequests
    } = req.body;

    // Calculate total amount based on package/concert/hotel
    let totalAmount = 0;
    let bookingData = {
        user: req.user._id,
        startDate,
        endDate,
        numberOfPeople,
        paymentMethod,
        specialRequests
    };

    if (packageId) {
        const package = await Package.findById(packageId);
        if (!package) {
            res.status(404);
            throw new Error('Package not found');
        }
        totalAmount = package.price * numberOfPeople;
        bookingData.package = packageId;
    } else {
        if (concertId) {
            const concert = await Concert.findById(concertId);
            if (!concert) {
                res.status(404);
                throw new Error('Concert not found');
            }
            bookingData.concert = concertId;
            // Add concert price to total
            const concertPrice = concert.pricing[0].price; // Basic implementation
            totalAmount += concertPrice * numberOfPeople;
        }

        if (hotelId) {
            const hotel = await Hotel.findById(hotelId);
            if (!hotel) {
                res.status(404);
                throw new Error('Hotel not found');
            }
            bookingData.hotel = hotelId;
            // Add hotel price to total
            const roomPrice = hotel.rooms[0].price; // Basic implementation
            const numberOfNights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
            totalAmount += roomPrice * numberOfPeople * numberOfNights;
        }
    }

    bookingData.totalAmount = totalAmount;

    const booking = await Booking.create(bookingData);

    res.status(201).json({
        status: 'success',
        data: {
            booking
        }
    });
});

exports.getBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate({
            path: 'user',
            select: '_id name email'
        })
        .populate({
            path: 'package',
            populate: [
                {
                    path: 'concert',
                    select: 'title artist date venue'
                },
                {
                    path: 'hotel',
                    select: 'name rating address'
                }
            ]
        });

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    // Check if the user is authorized to view this booking
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to view this booking');
    }

    res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    });
});

exports.getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id });

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings
        }
    });
});

exports.getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find();

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings
        }
    });
});

exports.cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate({
            path: 'user',
            select: '_id name email'
        });

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    // Check if the user is authorized to cancel this booking
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to cancel this booking');
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
        res.status(400);
        throw new Error('Booking is already cancelled');
    }

    // Calculate refund amount based on cancellation policy
    const currentDate = new Date();
    const bookingStartDate = new Date(booking.startDate);
    const daysUntilBooking = Math.ceil((bookingStartDate - currentDate) / (1000 * 60 * 60 * 24));

    let refundAmount = 0;
    if (daysUntilBooking > 7) {
        refundAmount = booking.totalAmount * 0.9; // 90% refund if cancelled more than 7 days before
    } else if (daysUntilBooking > 3) {
        refundAmount = booking.totalAmount * 0.5; // 50% refund if cancelled 3-7 days before
    }

    booking.status = 'cancelled';
    booking.cancellationReason = req.body.reason;
    booking.refundAmount = refundAmount;
    await booking.save();

    res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    });
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status');
    }

    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    });
});

exports.getBookingStats = asyncHandler(async (req, res) => {
    const stats = await Booking.aggregate([
        {
            $group: {
                _id: '$status',
                numBookings: { $sum: 1 },
                totalAmount: { $sum: '$totalAmount' }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});
