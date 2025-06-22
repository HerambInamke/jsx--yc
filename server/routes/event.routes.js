import express from 'express';
import {
  getAllEvents,
  searchEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller.js';

import { protect } from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/search', searchEvents);
router.get('/:id', getEvent);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
