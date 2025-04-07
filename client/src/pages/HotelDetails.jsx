import React from "react"
import { FaHeart } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import HotelDetailsTab from "../components/HotelDetailsTab";
import hotelData from "../StaticData/hotelData";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const HotelDetails = (props) => {

    const [liked, setLiked] = React.useState(false);

    const hotels = hotelData.map(hotel => {
        return (
            < HotelDetailsTab 
                name={hotel.name}
                location={hotel.location}
                rating={hotel.rating}
                price={hotel.price} 
                coverImg={hotel.coverImg}
                inRadius={hotel.inRadius}
            />
        )
    })

  return (
    <div 
        style={{fontFamily: "Inter"}}
        className="w-full h-full bg-white"
    >
        {/* backgroung */}
        <div        
            className="relative w-full h-40 sm:h-95 pt-22 sm:pt-60 bg-[url('/Backgrounds/hotel_bg.png')] bg-[length:100%_100%] "
        >
            {/* white overlay  */}
            <div className="absolute inset-0  bg-[#ffffff83]"></div>

            {/* content */}
            <div                        
                className="relative w-full flex flex-col pl-8 text-black font-[300]"
            >
                {/* Location titles */}
                <div className="">
                    <h2 className="text-lg sm:text-5xl">HOTELS IN PUNE</h2>
                    <p className="text-[0.6rem] sm:text-xl sm:m-1 m-0.5">LOCATION NEAR CONCERT STADIUM</p>
                </div>
                
                {/* dropdown and icons*/}
                <div className="flex flex-row min-w-full">   

                    {/* dropdown */}
                    <div className="flex flex-nowrap gap-2 items-center mt-2">
                            {/* City Dropdown */}
                            <FormControl fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="radius-select-label">Radius</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="radius-select-label"
                                    id="radius-select"
                                    label="Radius"
                                >
                                    <MenuItem value={1}>1 Km</MenuItem>
                                    <MenuItem value={2}>2 Km</MenuItem>
                                    <MenuItem value={3}>3 Km</MenuItem>
                                    <MenuItem value={4}>4 Km</MenuItem>
                                    <MenuItem value={5}>5 Km</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Date Dropdown */}
                            <FormControl fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="rating-select-label">Rating</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="rating-select-label"
                                    id="rating-select"
                                    label="Rating"
                                >
                                    <MenuItem value={5}>5 Stars</MenuItem>
                                    <MenuItem value={4}>4 Stars</MenuItem>
                                    <MenuItem value={3}>3 Stars</MenuItem>
                                    <MenuItem value={2}>2 Stars</MenuItem>
                                    <MenuItem value={1}>1 Star1</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Venue Dropdown */}
                            <FormControl fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="price-select-label">Price</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="price-select-label"
                                    id="price-select"
                                    label="Price"
                                >
                                    <MenuItem value={30000}>Under 30K</MenuItem>
                                    <MenuItem value={25000}>Under 25K</MenuItem>
                                    <MenuItem value={20000}>Under 20K</MenuItem>
                                    <MenuItem value={15000}>Under 15K</MenuItem>
                                    <MenuItem value={10000}>Under 10K</MenuItem>
                                </Select>
                            </FormControl>
                        </div>


                    {/* likes and share*/}
                    <div className="flex flex-row gap-2 place-items-center h-min ml-auto mr-5">

                        <div className="flex flex-row items-center gap-1 sm:gap-3 max-w-min rounded-xl sm:rounded-2xl px-2 sm:px-4 h-4 sm:h-8 bg-white">
                            <span className="text-[0.5rem] sm:text-base">43</span>
                            < FaHeart 
                                onClick={() => setLiked(!liked)}
                                className={`size-2 sm:size-5 ${liked ? "text-[#EE0A0A]" : "text-gray-500"}`}
                            />
                        </div>

                        <div className="rounded-4xl bg-white">
                            < IoMdShareAlt className="text-gray-800 text-center m-[3px] sm:m-1 text-xs sm:text-2xl"/>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        
        {/* Discount */}

        <div className="bg-gray-400 h-20 sm:h-100 m-4 sm:m-8 rounded-2xl"></div>

        {/* Hotels Tab */}
        <div className="mb-50">
            {hotels}
        </div>
        
    </div>
  )
};

export default HotelDetails;