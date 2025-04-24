const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    concert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        enum: ['standard', 'vip'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }],
    numberOfNights: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);