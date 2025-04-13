import React from "react";
import { useTimer } from "react-timer-hook";
import { Box, Modal, Button, Typography } from "@mui/material";

const CartPage = () => {
    // Set the timer to 10 minutes from now
    const time = new Date();
    time.setMinutes(time.getMinutes() + 10);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        restart,
    } = useTimer({
        expiryTimestamp: time,
        onExpire: () => console.warn("Timer expired"),
    });

    // Modals
    const [openTicketModal, setOpenTicketModal] = React.useState(false);
    const [openHotelModal, setOpenHotelModal] = React.useState(false);

    const handleOpenTicketModal = () => setOpenTicketModal(true);
    const handleCloseTicketModal = () => setOpenTicketModal(false);

    const handleOpenHotelModal = () => setOpenHotelModal(true);
    const handleCloseHotelModal = () => setOpenHotelModal(false);

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

    return (
        <div className="min-h-screen bg-gray-100 p-4 my-16 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Left Section */}
                <div className="md:col-span-2 space-y-8 place-content-center">

                    {/* Ticket Info Card */}
                    <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden min-h-[180px]">
                        <div className="w-full md:w-1/3 h-48 md:h-auto">
                            <img src="/YC (IMG)/cold.webp" alt="Coldplay Concert" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-4 relative flex flex-col justify-center">
                            <div className="absolute top-4 right-2 text-xl font-semibold text-gray-700">₹4,999</div>
                            <h2 className="text-lg font-semibold">Coldplay</h2>
                            <p className="text-sm text-gray-500">VIP Pass</p>
                            <p className="text-xs text-gray-400 mt-1">NSCI Dome, Mumbai</p>
                            <p className="text-xs text-gray-400 mt-1">7:30 PM, 24th May 2025</p>
                        </div>
                        <div className="flex items-end justify-end p-2">
                            <Button className="text-gray-400" onClick={handleOpenTicketModal}>▼</Button>
                            <Modal
                                open={openTicketModal}
                                onClose={handleCloseTicketModal}
                                aria-labelledby="ticket-modal-title"
                                aria-describedby="ticket-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="ticket-modal-title" variant="h6" component="h2">
                                        Event Details
                                    </Typography>
                                    <Typography id="ticket-modal-description" sx={{ mt: 2 }}>
                                        <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }}>
                                            <li><strong>Event:</strong> Coldplay Concert VIP Pass</li>
                                            <li><strong>Venue:</strong> NSCI Dome, Mumbai</li>
                                            <li><strong>Entry Time:</strong> From 6:30 PM</li>
                                            <li><strong>Event Start Time:</strong> 7:30 PM on 24th May 2025</li>
                                            <li><strong>ID Requirement:</strong> Valid government-issued ID required for entry</li>
                                            <li><strong>Policy:</strong> No re-entry allowed once inside</li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    </div>

                    {/* Hotel Info Card */}
                    <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden min-h-[180px]">
                        <div className="w-full md:w-1/3 h-48 md:h-auto">
                            <img src="/HotelImages/image_2.png" alt="Hotel Booking" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-4 relative flex flex-col justify-center">
                            <div className="absolute top-4 right-2 text-xl font-semibold text-gray-700">₹7,200</div>
                            <h2 className="text-lg font-semibold">Taj Lands End</h2>
                            <p className="text-sm text-gray-500">1 Night Stay · Deluxe Room</p>
                            <p className="text-xs text-gray-400 mt-1">Bandra West, Mumbai</p>
                            <p className="text-xs text-gray-400 mt-1">Check-in: 24th May · Check-out: 25th May</p>
                        </div>
                        <div className="flex items-end justify-end p-2">
                            <Button className="text-gray-400" onClick={handleOpenHotelModal}>▼</Button>
                            <Modal
                                open={openHotelModal}
                                onClose={handleCloseHotelModal}
                                aria-labelledby="hotel-modal-title"
                                aria-describedby="hotel-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="hotel-modal-title" variant="h6" component="h2">
                                        Hotel Details
                                    </Typography>
                                    <Typography id="hotel-modal-description" sx={{ mt: 2 }}>
                                        <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }}>
                                            <li><strong>Hotel:</strong> Taj Lands End, Bandra West, Mumbai</li>
                                            <li><strong>Room Type:</strong> Deluxe Room with premium amenities</li>
                                            <li><strong>Includes:</strong> 1-night stay, complimentary breakfast, access to swimming pool and spa</li>
                                            <li><strong>Check-in:</strong> From 2:00 PM on 24th May 2025</li>
                                            <li><strong>Check-out:</strong> By 11:00 AM on 25th May 2025</li>
                                            <li><strong>ID Requirement:</strong> Valid government-issued ID required during check-in</li>
                                            <li><strong>Special Requests:</strong> Early check-in, late check-out, or room preferences must be coordinated directly with the hotel</li>
                                        </ul>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6 p-4 rounded-lg bg-[#e3e3e3cb] shadow-md">
                    {/* Timer */}
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="text-4xl font-bold tracking-widest">
                            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            {isRunning ? "Time left to complete booking" : "Time expired"}
                        </p>
                    </div>

                    {/* Continue Button & Booking Summary */}
                    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                        <button className="w-full bg-gradient-to-r bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-900 transition">
                            CONTINUE
                        </button>

                        <div className="w-full h-fit mt-4 bg-gray-100 rounded p-4 text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span>Concert Ticket</span>
                                <span>₹4,999</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Hotel (1 Night)</span>
                                <span>₹7,200</span>
                            </div>
                            <div className="border-t border-gray-300 pt-2 flex justify-between font-medium text-gray-800">
                                <span>Total</span>
                                <span>₹12,199</span>
                            </div>
                        </div>
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

export default CartPage;
