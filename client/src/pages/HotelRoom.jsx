import React from "react";
import { Button, Rating } from "@mui/material";
import { motion } from 'framer-motion';

const HotelRoom = () => {
    const [isMapOpen, setIsMapOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-8 sm:px-[12%]">

            {/* View Venue Map Button */}
            <div className="text-right mb-4">
                <button
                    onClick={() => setIsMapOpen(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    View Venue Map
                </button>
            </div>

            {/* Venue Map Modal */}
            {isMapOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-xl max-w-3xl w-full mx-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Venue Map</h3>
                            <button
                                onClick={() => setIsMapOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                        <img
                            src="/YC (IMG)/VSHA19_SeatingMap_ConcertEnd-jpg.webp"
                            alt="Venue Map"
                            className="w-full rounded-lg"
                        />
                    </motion.div>
                </div>
            )}

            {/* Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <input placeholder="Location, area" className="p-3 border rounded w-full" />
                <input type="date" placeholder="Check in" className="p-3 border rounded w-full" />
                <input type="date" placeholder="Check out" className="p-3 border rounded w-full" />
                <input placeholder="No. of people in one room" className="p-3 border rounded w-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">

                {/* Hotel Images */}
                <div className="cursor-pointer" onClick={() => setIsMapOpen(true)}>
                    <img
                        src="/HotelImages/image_1.png"
                        alt="hotel main"
                        className="rounded-xl mb-3 w-full h-[250px] object-cover"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                            <img
                                key={i}
                                src="/HotelImages/image_1.png"
                                alt={`thumb-${i}`}
                                className="rounded-lg w-full h-[75px] object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Hotel Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-1">Deluxe Twin</h2>
                        <p className="text-sm text-gray-600 mb-2">Fits 2 Adults</p>
                        <ul className="text-sm list-disc ml-4 space-y-1">
                            <li>Book with ₹0 Payment</li>
                            <li>No meals included</li>
                            <li className="text-green-600">Free Cancellation till 24 hrs before check in</li>
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 line-through text-sm">₹6,644</p>
                        <p className="text-2xl font-bold">₹5,000</p>
                        <Button variant="contained" className="mt-4 bg-blue-600 text-white">
                            Add to Cart
                        </Button>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-col justify-between">
                    <h3 className="font-medium mb-2">Hotel Amenities</h3>
                    <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                        <li>Swimming</li>
                        <li>WiFi</li>
                        <li>Spa</li>
                        <li>Etc</li>
                    </ul>
                </div>

                {/* Rating */}
                <div className="mt-6">
                    <div className="flex items-center space-x-2">
                        <Rating value={5} readOnly />
                        <span className="text-sm font-medium">5.0</span>
                    </div>

                    <div className="w-[40%] rounded-lg overflow-hidden">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0195937920614!2d-122.42067938468259!3d37.77928027975862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5e1090b9%3A0x6dbf9e8f46da3dc7!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1616598358183!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Location: Google Maps types</p>
                </div>

            </div>

            {/* Similar Rooms */}
            <h3 className="text-lg font-semibold mt-10 mb-4">Other Rooms</h3>
            
        </div>
    );
};

export default HotelRoom;
