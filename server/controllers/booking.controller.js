import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { eventId, tickets, paymentInfo } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const ticket of tickets) {
      const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
      if (!ticketType) {
        return res.status(400).json({
          success: false,
          message: `Invalid ticket type: ${ticket.ticketType}`
        });
      }
      if (ticketType.quantity < ticket.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough tickets available for ${ticket.ticketType}`
        });
      }
      totalAmount += ticketType.price * ticket.quantity;
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      tickets,
      totalAmount,
      paymentInfo
    });

    // Update ticket quantities
    for (const ticket of tickets) {
      const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
      ticketType.quantity -= ticket.quantity;
    }
    await event.save();

    res.status(201).json({
      success: true,
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get single booking
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if the booking belongs to user or user is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if the booking belongs to user or user is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Restore ticket quantities
    const event = await Event.findById(booking.event);
    for (const ticket of booking.tickets) {
      const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
      ticketType.quantity += ticket.quantity;
    }
    await event.save();

    res.status(200).json({
      success: true,
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 