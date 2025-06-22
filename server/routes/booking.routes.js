import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking
} from '../controllers/booking.controller.js';
import { protect } from '../controllers/auth.controller.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:id', getBooking);
router.patch('/:id/cancel', cancelBooking);

export default router;
