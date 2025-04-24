const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    available: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }]
});

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    distanceFromVenue: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    images: [{
        type: String
    }],
    amenities: [{
        type: String
    }],
    rooms: [roomSchema],
    coordinates: {
        latitude: Number,
        longitude: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);