const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    createPaymentIntent,
    handleWebhook,
    refundPayment
} = require('../controllers/paymentController');

// Special middleware for Stripe webhooks that need raw body
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-payment-intent', auth, createPaymentIntent);
router.post('/:bookingId/refund', auth, refundPayment);

module.exports = router;