const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A package must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A package must have a description']
    },
    concert: {
        type: mongoose.Schema.ObjectId,
        ref: 'Concert',
        required: [true, 'A package must be associated with a concert']
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: [true, 'A package must be associated with a hotel']
    },
    duration: {
        type: Number,
        required: [true, 'A package must have a duration']
    },
    price: {
        type: Number,
        required: [true, 'A package must have a price']
    },
    inclusions: [{
        type: String,
        required: [true, 'A package must have inclusions']
    }],
    maxParticipants: {
        type: Number,
        required: [true, 'A package must have a maximum number of participants']
    },
    availableSpots: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: [true, 'A package must have a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'A package must have an end date']
    },
    highlights: [String],
    terms: [String],
    status: {
        type: String,
        enum: ['active', 'inactive', 'sold-out'],
        default: 'active'
    },
    discount: {
        type: Number,
        validate: {
            validator: function(val) {
                return val >= 0 && val <= 100;
            },
            message: 'Discount must be between 0 and 100'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate concert and hotel references when querying
packageSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'concert',
        select: 'title artist date venue'
    }).populate({
        path: 'hotel',
        select: 'name address rating'
    });
    next();
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
