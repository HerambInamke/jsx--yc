import Event from '../models/Event.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    
    res.status(200).json({
      success: true,
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get single event
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        event
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        event
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        event
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(204).json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Search events
export const searchEvents = async (req, res) => {
  try {
    const { keyword, category, date, price } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { artist: { $regex: keyword, $options: 'i' } },
        { 'venue.location': { $regex: keyword, $options: 'i' } }
      ];
    }

    if (category) {
      query.categories = category;
    }

    if (date) {
      query.date = { $gte: new Date(date) };
    }

    if (price) {
      query['ticketTypes.price'] = { $lte: parseInt(price) };
    }

    const events = await Event.find(query);

    res.status(200).json({
      success: true,
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 