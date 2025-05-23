const Concert = require('../models/Concert');
const asyncHandler = require('express-async-handler');

exports.getAllConcerts = asyncHandler(async (req, res) => {
    const concerts = await Concert.find();
    
    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});

exports.getConcert = asyncHandler(async (req, res) => {
    const concert = await Concert.findById(req.params.id);
    
    if (!concert) {
        res.status(404);
        throw new Error('Concert not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            concert
        }
    });
});

exports.createConcert = asyncHandler(async (req, res) => {
    const newConcert = await Concert.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            concert: newConcert
        }
    });
});

exports.updateConcert = asyncHandler(async (req, res) => {
    const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!concert) {
        res.status(404);
        throw new Error('Concert not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            concert
        }
    });
});

exports.deleteConcert = asyncHandler(async (req, res) => {
    const concert = await Concert.findByIdAndDelete(req.params.id);

    if (!concert) {
        res.status(404);
        throw new Error('Concert not found');
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getUpcomingConcerts = asyncHandler(async (req, res) => {
    const concerts = await Concert.find({
        date: { $gt: new Date() },
        status: 'upcoming'
    }).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});

exports.getFeaturedConcerts = asyncHandler(async (req, res) => {
    const concerts = await Concert.find({
        featured: true,
        date: { $gt: new Date() }
    }).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});

exports.getConcertsByDate = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide start and end dates');
    }

    const concerts = await Concert.find({
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});

exports.getConcertsByArtist = asyncHandler(async (req, res) => {
    const { artist } = req.query;

    if (!artist) {
        res.status(400);
        throw new Error('Please provide an artist name');
    }

    const concerts = await Concert.find({
        artist: { $regex: artist, $options: 'i' }
    }).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});

exports.getConcertsByGenre = asyncHandler(async (req, res) => {
    const { genre } = req.query;

    if (!genre) {
        res.status(400);
        throw new Error('Please provide a genre');
    }

    const concerts = await Concert.find({
        genre: { $in: [genre] }
    }).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: concerts.length,
        data: {
            concerts
        }
    });
});
