const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: String, // Firebase UID
        required: true
    },
    type: {
        type: String,
        enum: ['concert', 'hotel', 'package'],
        required: true
    },
    concert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert'
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    ticketType: {
        type: String,
        enum: ['standard', 'vip']
    },
    roomType: String,
    checkIn: Date,
    checkOut: Date,
    numberOfGuests: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: String,
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);