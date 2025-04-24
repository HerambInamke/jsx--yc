const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    getConcerts,
    getConcert,
    createConcert,
    updateConcert,
    deleteConcert,
    checkAvailability
} = require('../controllers/concertController');

// Public routes
router.get('/', getConcerts);
router.get('/:id', getConcert);
router.post('/check-availability', checkAvailability);

// Protected routes
router.post('/', auth, createConcert);
router.put('/:id', auth, updateConcert);
router.delete('/:id', auth, deleteConcert);

module.exports = router;