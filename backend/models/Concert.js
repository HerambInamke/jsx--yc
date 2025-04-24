const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
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
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pricing: {
        standard: {
            type: Number,
            required: true
        },
        vip: {
            type: Number,
            required: true
        }
    },
    availableSeats: {
        standard: {
            type: Number,
            required: true
        },
        vip: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Concert', concertSchema);