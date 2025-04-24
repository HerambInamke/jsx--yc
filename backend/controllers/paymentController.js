const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

exports.createPaymentIntent = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(booking.totalAmount * 100), // Convert to cents
            currency: 'inr',
            metadata: {
                bookingId: bookingId,
                userId: booking.user
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful payment
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        try {
            await Booking.findByIdAndUpdate(bookingId, {
                paymentStatus: 'completed',
                paymentId: paymentIntent.id,
                bookingStatus: 'confirmed'
            });
        } catch (error) {
            console.error('Error updating booking:', error);
            return res.status(500).end();
        }
    }

    // Handle failed payment
    if (event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        try {
            await Booking.findByIdAndUpdate(bookingId, {
                paymentStatus: 'failed'
            });
        } catch (error) {
            console.error('Error updating booking:', error);
            return res.status(500).end();
        }
    }

    res.json({ received: true });
};

exports.refundPayment = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);

        if (!booking || !booking.paymentId) {
            return res.status(404).json({ message: 'Booking or payment not found' });
        }

        // Process refund through Stripe
        const refund = await stripe.refunds.create({
            payment_intent: booking.paymentId
        });

        // Update booking status
        booking.paymentStatus = 'refunded';
        booking.bookingStatus = 'cancelled';
        await booking.save();

        res.json({ refund });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};