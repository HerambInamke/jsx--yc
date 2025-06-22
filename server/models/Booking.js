import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Booking must belong to an event']
  },
  tickets: [{
    ticketType: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true
    },
    seats: [{
      section: String,
      row: String,
      seatNumber: String
    }]
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['credit_card', 'debit_card', 'upi', 'net_banking']
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Populate user and event details when querying
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email phoneNumber'
  }).populate({
    path: 'event',
    select: 'name date time venue'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;