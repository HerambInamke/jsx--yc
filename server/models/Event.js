const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  venue: {
    name: {
      type: String,
      required: [true, 'Venue name is required']
    },
    location: {
      type: String,
      required: [true, 'Venue location is required']
    },
    capacity: {
      type: Number,
      required: [true, 'Venue capacity is required']
    }
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  image: {
    type: String,
    required: [true, 'Event image is required']
  },
  categories: [{
    type: String,
    enum: ['concert', 'festival', 'live-music', 'performance']
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  ticketTypes: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    description: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if event is sold out
eventSchema.virtual('isSoldOut').get(function() {
  return this.ticketTypes.every(type => type.quantity === 0);
});

module.exports = mongoose.model('Event', eventSchema); 