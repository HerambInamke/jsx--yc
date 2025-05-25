const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A hotel must have a description']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    images: [String],
    amenities: [String],
    rooms: [{
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        capacity: Number,
        available: {
            type: Boolean,
            default: true
        },
        amenities: [String]
    }],
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String
    },
    priceRange: {
        min: Number,
        max: Number
    },
    contactInfo: {
        phone: String,
        email: String,
        website: String
    },
    policies: {
        checkIn: String,
        checkOut: String,
        cancellation: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for location-based queries
hotelSchema.index({ location: '2dsphere' });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
