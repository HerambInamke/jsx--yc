import React from "react";
import { Link } from "react-router-dom";
import { Box, Modal, Button, Typography } from "@mui/material";
import { useCart } from '../contexts/CartContext';

const PreCartPage = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { cart, removeFromCart } = useCart();

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (parseInt(item.price.toString().replace(/[^\d]/g, '')) * item.quantity), 0);
    const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
    const platformFee = Math.round(subtotal * 0.03); // 3% platform fee
    const total = subtotal + serviceFee + platformFee;

    return (
        <div className="min-h-screen bg-gray-100 p-4 my-16 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Left Section */}
                <div className="md:col-span-2 space-y-8 place-content-center">
                    {/* Cart Items */}
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                            No items in your cart.
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden min-h-[180px] mb-4 border border-gray-200">
                                <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-50 flex items-center justify-center">
                                    <img src={item.image || '/YC (IMG)/cold.webp'} alt={item.section} className="w-full h-full object-cover rounded-l-xl" />
                                </div>
                                <div className="flex-1 p-6 relative flex flex-col justify-center">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold text-festival-primary">{item.section}</h2>
                                        <span className="text-lg font-bold text-gray-700">{item.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">Row {item.row}</p>
                                    <p className="text-xs text-gray-400 mb-1">Quantity: {item.quantity}</p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors w-fit text-xs font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Right Section */}
                <div className="space-y-6 p-4 rounded-lg bg-white shadow-md border border-gray-200">
                    {/* Booking Summary */}
                    <div className="bg-gray-50 p-6 rounded-xl shadow flex flex-col items-center">
                        <div className="w-full h-fit bg-white rounded p-4 text-sm text-gray-700 space-y-2 border border-gray-100">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Fee (5%)</span>
                                <span>₹{serviceFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Platform Fee (3%)</span>
                                <span>₹{platformFee.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-300 pt-2 flex justify-between font-medium text-gray-800 text-lg">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link to="/cart" className="w-full mt-6">
                            <button className="w-full bg-gradient-to-r from-festival-primary to-festival-primary-dark text-white py-3 rounded-lg font-semibold hover:from-festival-primary-dark hover:to-festival-primary transition">
                                CONFIRM & PAY
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Terms Section */}
            <div className="bg-white p-8 mt-10 rounded-xl shadow max-w-6xl mx-auto space-y-4">
                <p className="text-center text-xl font-semibold text-gray-800">
                    Terms and Conditions
                </p>

                <p className="text-sm text-gray-600">
                    By using this platform to book event tickets and hotel accommodations, you agree to the following terms:
                </p>

                <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
                    <li>All bookings are subject to availability and confirmation.</li>
                    <li>Payments must be made in full at the time of booking. Accepted methods include UPI, credit/debit cards, and net banking.</li>
                    <li>Tickets are non-refundable unless the event is canceled or rescheduled.</li>
                    <li>Hotel cancellations are subject to individual property policies. Please check before booking.</li>
                    <li>Valid ID proof is required at both the event venue and hotel check-in.</li>
                    <li>Only the person whose name is on the booking will be granted entry.</li>
                    <li>Any misuse or fraudulent activity may result in booking cancellation and legal action.</li>
                    <li>We are not responsible for service delays or disruptions caused by third parties.</li>
                    <li>User data is protected as per our Privacy Policy and is never shared without consent.</li>
                </ul>

                <p className="text-xs text-center text-gray-400 mt-6">
                    For assistance, contact us at support@yourwebsite.com or call +91-XXXXXXXXXX
                </p>
            </div>
        </div>
    );
};

export default PreCartPage;
