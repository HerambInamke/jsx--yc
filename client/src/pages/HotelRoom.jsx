import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

import { Button, Rating } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';

import RoomDetailsTab from "../components/RoomDetaliesTab.jsx";
import { useCart } from "../contexts/CartContext.jsx";

const HotelRoom = () => {
    // Lifted state for the selected room
    const [selectedRoom, setSelectedRoom] = React.useState(null);
    const [isMapOpen, setIsMapOpen] = React.useState(false);

    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Ref for the modal
    const modalRef = React.useRef();

    // Close modal if clicking outside of it
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsMapOpen(false); // Close the modal if clicked outside
            }
        };

        // Add event listener for clicks outside the modal
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener when component unmounts
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sample data for rooms
    const roomData = [
        {
            name: "Ocean View Suite",
            location: "Goa, India",
            img: ["/HotelImages/image_5.png", "/HotelImages/image_5.1.png", "/HotelImages/image_5.2.png", "/HotelImages/image_5.3.png"],
            rating: 4,
            price: 6500,
            amenities: ["Wi-Fi", "Sea View", "Air Conditioning", "Private Balcony", "Breakfast Included"]
        },
        {
            name: "Mountain Retreat",
            location: "Manali, India",
            img: ["/HotelImages/image_6.png", "/HotelImages/image_6.1.png", "/HotelImages/image_6.2.png", "/HotelImages/image_6.3.png"],
            rating: 4.7,
            price: 7200,
            amenities: ["Heater", "Mountain View", "Free Parking", "Hot Tub", "Room Service"]
        },
        {
            name: "City Lights Studio",
            location: "Mumbai, India",
            img: ["/HotelImages/image_7.png", "/HotelImages/image_7.1.png", "/HotelImages/image_7.2.png", "/HotelImages/image_7.3.png"],
            rating: 4.3,
            price: 5800,
            amenities: ["Wi-Fi", "City View", "Mini Bar", "Smart TV", "Gym Access"]
        },
        {
            name: "Desert Villa",
            location: "Jaisalmer, India",
            img: ["/HotelImages/image_8.png", "/HotelImages/image_8.1.png", "/HotelImages/image_8.2.png"],
            rating: 3.7,
            price: 6000,
            amenities: ["Desert Safari", "Cultural Shows", "Free Breakfast", "Air Conditioning", "Private Courtyard"]
        }
    ];    

    // Initialize selected room on mount
    React.useEffect(() => {
        if (roomData.length) setSelectedRoom(roomData[0]);
    }, []);

    const onClick = (room) => {
        setSelectedRoom(room);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 250); // delay
    };

    // Render similar rooms with click handler
    const roomList = roomData.map((room) => (
        <RoomDetailsTab
            key={room.name}
            name={room.name}
            location={room.location}
            coverImg={room.img[0]}
            rating={room.rating}
            price={room.price}
            onClick={() => onClick(room)}
            isSelected={selectedRoom?.name === room.name}
        />
    ));

    if (!selectedRoom) return null; // or loading indicator

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-8 sm:px-[8%]">

            {/* Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <input placeholder="Location, area" className="p-3 border rounded w-full" />
                <input type="date" placeholder="Check in" className="p-3 border rounded w-full" />
                <input type="date" placeholder="Check out" className="p-3 border rounded w-full" />
                <input placeholder="No. of people in one room" className="p-3 border rounded w-full" />
            </div>

            {/* Main Room Card */}
            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Image Collage Section */}
                <div className="grid grid-cols-3 gap-2 max-h-[250px] cursor-pointer" onClick={() => setIsMapOpen(true)}>
                    {/* Big image on the left */}
                    <div className="col-span-2 h-full">
                        <img
                            src={selectedRoom.img[0]}
                            alt={selectedRoom.name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Two stacked images on the right */}
                    <div className="flex flex-col gap-2 h-full">
                        <img
                            src={selectedRoom.img[1]}
                            alt="Secondary 1"
                            className="w-full h-1/2 object-cover rounded-xl"
                        />
                        <img
                            src={selectedRoom.img[2]}
                            alt="Secondary 2"
                            className="w-full h-1/2 object-cover rounded-xl"
                        />
                    </div>
                </div>


                {/* Main Info Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-1">{selectedRoom.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{selectedRoom.location}</p>
                        <div className="flex items-center space-x-2 mb-4">
                            <Rating value={selectedRoom.rating} precision={0.5} readOnly />
                            <span className="text-sm font-medium">{selectedRoom.rating}</span>
                        </div>
                        <ul className="text-sm list-disc ml-4 space-y-1">
                            {selectedRoom.amenities.map((amenitie, idx) => 
                                <li key={amenitie + idx}>{amenitie}</li>
                            )}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 line-through text-sm">₹{(selectedRoom.price * 1.15).toFixed(0)}</p>
                        <p className="text-2xl font-bold">₹{selectedRoom.price}</p>
                        <Button
                            variant="contained"
                            className="mt-4 text-white"
                            sx={{
                                backgroundColor: '#510378',
                                '&:hover': { backgroundColor: '#3a025a' }
                            }}
                            onClick={() => {
                                addToCart({
                                    id: selectedRoom.name,
                                    section: selectedRoom.name,
                                    price: `₹${selectedRoom.price}`,
                                    row: selectedRoom.location,
                                    image: selectedRoom.img[0],
                                    quantity: 1,
                                    type: 'hotel'
                                });
                                navigate("/precart");
                            }}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Similar Rooms */}
            <div>
                <h3 className=" text-lg font-semibold mt-20 mb-4">Other Rooms</h3>
                {roomList}
            </div>

            {/* More Images Modal */}
            <AnimatePresence>
                {isMapOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white p-6 rounded-xl max-w-3xl w-full mx-4"
                            ref={modalRef}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Room Images</h3>
                                <CloseIcon
                                    onClick={() => setIsMapOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                />
                            </div>

                            <Carousel dynamicHeight={false} infiniteLoop={true} useKeyboardArrows={true}>
                                {selectedRoom.img.map((img, index) => {
                                    return (
                                        <div className="object-cover max-h-[35rem] w-full" key={index}>
                                            <img
                                                src={img}
                                                className=""
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HotelRoom;