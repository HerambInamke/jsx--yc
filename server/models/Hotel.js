const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: String,
  price: Number,
  capacity: Number,
  amenities: [String]
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },
  rating: Number,
  images: [String],
  amenities: [String],
  rooms: [roomSchema],
  priceRange: {
    min: Number,
    max: Number
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  }
}, { timestamps: true });

hotelSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hotel', hotelSchema); 