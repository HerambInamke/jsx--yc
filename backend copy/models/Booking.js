const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User']
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
    },
    concert: {
        type: mongoose.Schema.ObjectId,
        ref: 'Concert'
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel'
    },
    bookingDate: {
        type: Date,
        default: Date.now()
    },
    startDate: {
        type: Date,
        required: [true, 'Booking must have a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Booking must have an end date']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Booking must have a total amount']
    },
    numberOfPeople: {
        type: Number,
        required: [true, 'Booking must specify number of people']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking'],
        required: true
    },
    specialRequests: String,
    cancellationReason: String,
    refundAmount: Number,
    tickets: [{
        seatNumber: String,
        category: String,
        price: Number
    }],
    hotelRoom: {
        roomType: String,
        roomNumber: String,
        checkIn: Date,
        checkOut: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate references when querying
bookingSchema.pre(/^find/, function(next) {
    this.populate('user')
        .populate('package')
        .populate('concert')
        .populate('hotel');
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
