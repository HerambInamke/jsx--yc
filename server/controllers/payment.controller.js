const Razorpay = require('razorpay');
const crypto = require('crypto');
const { getEnv } = require('../utils/env.js');

const createOrder = async (req, res) => {
    const instance = new Razorpay({
        key_id: getEnv('RAZORPAY_KEY_ID'),
        key_secret: getEnv('RAZORPAY_KEY_SECRET'),
    });

    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: `receipt ${Date.now()}`,
        payment_capture: 1,
    };

    try {
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", getEnv('RAZORPAY_KEY_SECRET'))
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid Signature",
        });
    }
};

module.exports = { createOrder, verifyPayment };
