const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const authController = require('../controllers/auth.controller');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/search', eventController.searchEvents);
router.get('/:id', eventController.getEvent);

// Protected routes
router.use(authController.protect);

// Admin only routes
router.post('/', eventController.createEvent);
router.patch('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router; 