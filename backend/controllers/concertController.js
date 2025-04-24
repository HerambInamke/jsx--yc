const Concert = require('../models/Concert');

// Get all concerts
exports.getConcerts = async (req, res) => {
    try {
        const { location, date, category } = req.query;
        let query = {};

        if (location) query.location = location;
        if (date) query.date = { $gte: new Date(date) };
        if (category) query.category = category;

        const concerts = await Concert.find(query).sort({ date: 1 });
        res.json(concerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single concert
exports.getConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }
        res.json(concert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a concert
exports.createConcert = async (req, res) => {
    try {
        const concert = new Concert(req.body);
        const newConcert = await concert.save();
        res.status(201).json(newConcert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a concert
exports.updateConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }

        Object.assign(concert, req.body);
        const updatedConcert = await concert.save();
        res.json(updatedConcert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a concert
exports.deleteConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }

        await concert.remove();
        res.json({ message: 'Concert deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check ticket availability
exports.checkAvailability = async (req, res) => {
    try {
        const { id, ticketType, quantity } = req.body;
        const concert = await Concert.findById(id);
        
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }

        const available = concert.availableSeats[ticketType];
        const isAvailable = available >= quantity;

        res.json({
            available: isAvailable,
            remainingSeats: available
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};