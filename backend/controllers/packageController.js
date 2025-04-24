const Package = require('../models/Package');

// Get all packages
exports.getPackages = async (req, res) => {
    try {
        const { priceRange, numberOfNights } = req.query;
        let query = {};

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            query.price = { $gte: min, $lte: max };
        }
        if (numberOfNights) {
            query.numberOfNights = Number(numberOfNights);
        }

        const packages = await Package.find(query)
            .populate('concert')
            .populate('hotel')
            .sort({ price: 1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single package
exports.getPackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id)
            .populate('concert')
            .populate('hotel');
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a package
exports.createPackage = async (req, res) => {
    try {
        const package = new Package(req.body);
        const newPackage = await package.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a package
exports.updatePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        Object.assign(package, req.body);
        const updatedPackage = await package.save();
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a package
exports.deletePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        await package.remove();
        res.json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check package availability
exports.checkAvailability = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const package = await Package.findById(id);
        
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const isAvailable = package.available >= quantity;

        res.json({
            available: isAvailable,
            remainingPackages: package.available
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};