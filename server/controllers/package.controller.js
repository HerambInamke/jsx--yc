const Package = require('../models/Package');

// Get all packages (with optional filtering)
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('concert hotel');
    res.status(200).json({
      status: 'success',
      results: packages.length,
      data: { packages }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get single package
exports.getPackage = async (req, res) => {
  try {
    const packageObj = await Package.findById(req.params.id).populate('concert hotel');
    if (!packageObj) return res.status(404).json({ status: 'fail', message: 'Package not found' });
    res.status(200).json({ status: 'success', data: { package: packageObj } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Create package (admin only)
exports.createPackage = async (req, res) => {
  try {
    const packageObj = await Package.create(req.body);
    res.status(201).json({ status: 'success', data: { package: packageObj } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Update package (admin only)
exports.updatePackage = async (req, res) => {
  try {
    const packageObj = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!packageObj) return res.status(404).json({ status: 'fail', message: 'Package not found' });
    res.status(200).json({ status: 'success', data: { package: packageObj } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Delete package (admin only)
exports.deletePackage = async (req, res) => {
  try {
    const packageObj = await Package.findByIdAndDelete(req.params.id);
    if (!packageObj) return res.status(404).json({ status: 'fail', message: 'Package not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
}; 