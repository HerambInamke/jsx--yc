const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  concert: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  duration: Number,
  price: Number,
  inclusions: [String],
  maxParticipants: Number,
  availableSpots: Number,
  startDate: Date,
  endDate: Date,
  highlights: [String],
  terms: [String],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema); 