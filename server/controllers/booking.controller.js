const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Package = require('../models/Package');

// Create new booking (event or package)
exports.createBooking = async (req, res) => {
  try {
    const { eventId, packageId, tickets, paymentInfo, startDate, endDate, numberOfPeople, specialRequests } = req.body;
    let bookingData = { user: req.user.id, paymentInfo, specialRequests };
    let totalAmount = 0;

    if (packageId) {
      // Package booking
      const packageObj = await Package.findById(packageId);
      if (!packageObj) {
        return res.status(404).json({ status: 'fail', message: 'Package not found' });
      }
      if (packageObj.availableSpots < numberOfPeople) {
        return res.status(400).json({ status: 'fail', message: 'Not enough spots available' });
      }
      totalAmount = packageObj.price * numberOfPeople;
      bookingData.package = packageId;
      bookingData.startDate = startDate;
      bookingData.endDate = endDate;
      bookingData.numberOfPeople = numberOfPeople;
      bookingData.totalAmount = totalAmount;
      // Decrement available spots
      packageObj.availableSpots -= numberOfPeople;
      await packageObj.save();
    } else if (eventId) {
      // Event booking
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ status: 'fail', message: 'Event not found' });
      }
      // Calculate total amount and update ticket quantities
      const processedTickets = [];
      for (const ticket of tickets) {
        const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
        if (!ticketType) {
          return res.status(400).json({ status: 'fail', message: `Invalid ticket type: ${ticket.ticketType}` });
        }
        if (ticketType.quantity < ticket.quantity) {
          return res.status(400).json({ status: 'fail', message: `Not enough tickets available for ${ticket.ticketType}` });
        }
        totalAmount += ticketType.price * ticket.quantity;
        processedTickets.push({
          ticketType: ticket.ticketType,
          quantity: ticket.quantity,
          price: ticketType.price
        });
      }
      bookingData.event = eventId;
      bookingData.tickets = processedTickets;
      bookingData.totalAmount = totalAmount;
      // Update ticket quantities
      for (const ticket of tickets) {
        const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
        ticketType.quantity -= ticket.quantity;
      }
      await event.save();
    } else {
      return res.status(400).json({ status: 'fail', message: 'Must provide either eventId or packageId' });
    }

    const booking = await Booking.create(bookingData);
    res.status(201).json({ status: 'success', data: { booking } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get user bookings (populate event and package)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event')
      .populate({ path: 'package', populate: ['concert', 'hotel'] });
    res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get single booking (populate event and package)
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate({ path: 'package', populate: ['concert', 'hotel'] });
    if (!booking) {
      return res.status(404).json({ status: 'fail', message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Not authorized to access this booking' });
    }
    res.status(200).json({ status: 'success', data: { booking } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Cancel booking (restore spots/tickets)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ status: 'fail', message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Not authorized to cancel this booking' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ status: 'fail', message: 'Booking is already cancelled' });
    }
    booking.status = 'cancelled';
    await booking.save();
    // Restore tickets or package spots
    if (booking.event) {
      const event = await Event.findById(booking.event);
      for (const ticket of booking.tickets) {
        const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
        ticketType.quantity += ticket.quantity;
      }
      await event.save();
    }
    if (booking.package) {
      const packageObj = await Package.findById(booking.package);
      packageObj.availableSpots += booking.numberOfPeople;
      await packageObj.save();
    }
    res.status(200).json({ status: 'success', data: { booking } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user')
      .populate('event')
      .populate({ path: 'package', populate: ['concert', 'hotel'] });
    res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Admin: Get booking statistics
exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmed = await Booking.countDocuments({ status: 'confirmed' });
    const cancelled = await Booking.countDocuments({ status: 'cancelled' });
    const pending = await Booking.countDocuments({ status: 'pending' });
    res.status(200).json({
      status: 'success',
      data: { totalBookings, confirmed, cancelled, pending }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Admin: Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ status: 'fail', message: 'Booking not found' });
    res.status(200).json({ status: 'success', data: { booking } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
}; 