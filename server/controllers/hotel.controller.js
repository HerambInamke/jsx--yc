const Hotel = require('../models/Hotel');

// Get all hotels (with optional filtering)
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      status: 'success',
      results: hotels.length,
      data: { hotels }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get single hotel
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ status: 'fail', message: 'Hotel not found' });
    res.status(200).json({ status: 'success', data: { hotel } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Create hotel (admin only)
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ status: 'success', data: { hotel } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Update hotel (admin only)
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hotel) return res.status(404).json({ status: 'fail', message: 'Hotel not found' });
    res.status(200).json({ status: 'success', data: { hotel } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Delete hotel (admin only)
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ status: 'fail', message: 'Hotel not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
}; 