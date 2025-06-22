const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/payment.controller.js");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
