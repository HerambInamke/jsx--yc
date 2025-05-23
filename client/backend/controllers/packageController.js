const Package = require('../models/Package');
const asyncHandler = require('express-async-handler');

exports.getAllPackages = asyncHandler(async (req, res) => {
    const packages = await Package.find();
    
    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            packages
        }
    });
});

exports.getPackage = asyncHandler(async (req, res) => {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
        res.status(404);
        throw new Error('Package not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            package
        }
    });
});

exports.createPackage = asyncHandler(async (req, res) => {
    const newPackage = await Package.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            package: newPackage
        }
    });
});

exports.updatePackage = asyncHandler(async (req, res) => {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!package) {
        res.status(404);
        throw new Error('Package not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            package
        }
    });
});

exports.deletePackage = asyncHandler(async (req, res) => {
    const package = await Package.findByIdAndDelete(req.params.id);

    if (!package) {
        res.status(404);
        throw new Error('Package not found');
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getPackagesByDateRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide start and end dates');
    }

    const packages = await Package.find({
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) }
    });

    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            packages
        }
    });
});

exports.getPackagesByPriceRange = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    if (!minPrice || !maxPrice) {
        res.status(400);
        throw new Error('Please provide minimum and maximum prices');
    }

    const packages = await Package.find({
        price: { $gte: minPrice, $lte: maxPrice }
    });

    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            packages
        }
    });
});

exports.getFeaturedPackages = asyncHandler(async (req, res) => {
    const packages = await Package.find({
        status: 'active'
    })
    .sort('-createdAt')
    .limit(6);

    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            packages
        }
    });
});

exports.checkPackageAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { numberOfPeople, date } = req.query;

    if (!numberOfPeople || !date) {
        res.status(400);
        throw new Error('Please provide number of people and date');
    }

    const package = await Package.findById(id);

    if (!package) {
        res.status(404);
        throw new Error('Package not found');
    }

    const isAvailable = package.availableSpots >= numberOfPeople &&
        new Date(date) >= package.startDate &&
        new Date(date) <= package.endDate &&
        package.status === 'active';

    res.status(200).json({
        status: 'success',
        data: {
            isAvailable,
            availableSpots: package.availableSpots,
            package
        }
    });
});
