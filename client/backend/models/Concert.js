const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A concert must have a title'],
        trim: true
    },
    artist: {
        type: String,
        required: [true, 'A concert must have an artist']
    },
    description: {
        type: String,
        required: [true, 'A concert must have a description']
    },
    date: {
        type: Date,
        required: [true, 'A concert must have a date']
    },
    venue: {
        name: String,
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        capacity: Number
    },
    image: String,
    duration: String,
    genre: [String],
    pricing: [{
        category: String,
        price: Number,
        available: {
            type: Boolean,
            default: true
        },
        totalSeats: Number,
        remainingSeats: Number
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: [String],
    additionalInfo: {
        ageRestriction: String,
        doorOpeningTime: String,
        guidelines: [String]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate with bookings
concertSchema.virtual('bookings', {
    ref: 'Booking',
    foreignField: 'concert',
    localField: '_id'
});

const Concert = mongoose.model('Concert', concertSchema);
module.exports = Concert;
