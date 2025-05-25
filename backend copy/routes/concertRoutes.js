const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concertController');
const { protect, restrictTo } = require('../middleware/auth');

router
    .route('/')
    .get(concertController.getAllConcerts)
    .post(protect, restrictTo('admin'), concertController.createConcert);

router
    .route('/:id')
    .get(concertController.getConcert)
    .patch(protect, restrictTo('admin'), concertController.updateConcert)
    .delete(protect, restrictTo('admin'), concertController.deleteConcert);

router.get('/upcoming', concertController.getUpcomingConcerts);
router.get('/featured', concertController.getFeaturedConcerts);
router.get('/search/date', concertController.getConcertsByDate);
router.get('/search/artist', concertController.getConcertsByArtist);
router.get('/search/genre', concertController.getConcertsByGenre);

module.exports = router;
