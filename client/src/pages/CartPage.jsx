import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Box, Modal, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, clearCart, removeFromCart } = useCart();
    const time = new Date();
    time.setMinutes(time.getMinutes() + 10);
    const [timerExpired, setTimerExpired] = React.useState(false);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        restart,
        pause,
        resume
    } = useTimer({
        expiryTimestamp: time,
        onExpire: () => {
            clearCart();
            setTimerExpired(true);
        },
    });

    useEffect(() => {
        if (cart.length === 0) {
            pause();
        } else {
            resume();
        }
    }, [cart, pause, resume]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePayment = () => {
        navigate('/payment');
    };

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
                    {/* Ticket Info Card */}
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                            <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
                            <p>Add some items to your cart to start the reservation timer.</p>
                            <button 
                                onClick={() => navigate('/explore')} 
                                className="mt-6 px-6 py-2 bg-festival-primary text-white rounded-lg hover:bg-festival-primary-dark transition-colors"
                            >
                                Explore Events
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden min-h-[180px] mb-4">
                                <div className="w-full md:w-1/3 h-48 md:h-auto">
                                    <img src="/YC (IMG)/cold.webp" alt="Concert" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 p-4 relative flex flex-col justify-center">
                                    <div className="absolute top-4 right-2 text-xl font-semibold text-gray-700">{item.price}</div>
                                    <h2 className="text-lg font-semibold">{item.section}</h2>
                                    <p className="text-sm text-gray-500">Row {item.row}</p>
                                    <p className="text-xs text-gray-400 mt-1">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Section */}
                {cart.length > 0 && (
                    <div className="space-y-6 p-4 rounded-lg bg-[#e3e3e3cb] shadow-md">
                        {/* Timer */}
                        <div className="bg-white p-6 rounded-xl shadow text-center">
                            <div className="text-4xl font-bold tracking-widest">
                                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                            </div>
                            <p className="mt-4 text-sm text-gray-500">
                                {isRunning ? "Time left to complete booking" : "Timer paused"}
                            </p>
                        </div>

                        {/* Continue Button */}
                        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                            <button 
                                onClick={handlePayment}
                                className="w-full bg-gradient-to-r bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-900 transition"
                            >
                                PROCEED TO PAYMENT
                            </button>

                            <div className="w-full h-fit mt-4 bg-gray-100 rounded p-4 text-sm text-gray-700 space-y-2">
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
                                <div className="border-t border-gray-300 pt-2 flex justify-between font-medium text-gray-800">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

export default CartPage;