import React from "react"
import { FaHeart } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import TickectDetailsTab from "../components/ConcertDetailsTab";
import concertData from "../StaticData/concertData";
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


const ConcertDetails = (props) => {

    const [liked, setLiked] = React.useState(false);

    const tickets = concertData.map(concert => {
        return (
            < TickectDetailsTab
                date={concert.date}
                time={concert.time}
                name={concert.name}
                location={concert.location}
            />
        )
    })

    return (
        <div
            style={{ fontFamily: "Inter" }}
            className="w-full h-full bg-white"
        >
            {/* backgroung */}
            <div
                className="relative w-full h-40 sm:h-95 pt-22 sm:pt-60 bg-[url('/Backgrounds/coldpay_bg.png')] bg-[length:100%_100%] "
            >
                {/* white overlay  */}
                <div className="absolute inset-0  bg-[#ffffffaf]"></div>

                {/* content */}
                <div
                    className="relative w-full flex flex-col pl-8 text-black font-[300]"
                >
                    {/* Concert name and artist name */}
                    <div className="">
                        <h2 className="text-lg sm:text-5xl">CONCERT NAME</h2>
                        <p className="text-[0.6rem] sm:text-xl sm:m-1 m-0.5">ARTIST NAME</p>
                    </div>

                    {/* dropdown and icons*/}
                    <div className="flex flex-row min-w-full">

                        {/* dropdown */}
                        <div className="flex flex-nowrap gap-2 items-center mt-2">
                            {/* City Dropdown */}
                            <FormControl className="formControl" fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="city-select-label">City</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="city-select-label"
                                    id="city-select"
                                    label="City"
                                >
                                <MenuItem value="pune">Pune</MenuItem>
                                <MenuItem value="mumbai">Mumbai</MenuItem>
                                <MenuItem value="delhi">Delhi</MenuItem>
                                <MenuItem value="bangalore">Bangalore</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Date Dropdown */}
                            <FormControl className="formControl" fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="date-select-label">Date</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="date-select-label"
                                    id="date-select"
                                    label="Date"
                                >
                                <MenuItem value="5-Apr-2025">5 Apr 2025</MenuItem>
                                <MenuItem value="12-Apr-2025">12 Apr 2025</MenuItem>
                                <MenuItem value="20-Apr-2025">20 Apr 2025</MenuItem>
                                <MenuItem value="27-Apr-2025">27 Apr 2025</MenuItem>
                                <MenuItem value="4-May-2025">4 May 2025</MenuItem>
                                <MenuItem value="11-May-2025">11 May 2025</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Venue Dropdown */}
                            <FormControl className="formControl" fullWidth size="small">
                                <InputLabel className="dropDownLabel" id="venue-select-label">Venue</InputLabel>
                                <Select
                                    className="dropDown"
                                    labelId="venue-select-label"
                                    id="venue-select"
                                    label="Venue"
                                >
                                <MenuItem value="shaniwarwada">Shaniwar Wada</MenuItem>
                                <MenuItem value="gateWay">Gateway of India</MenuItem>
                                <MenuItem value="redfort">Red Fort</MenuItem>
                                <MenuItem value="lalbagh">Lalbagh Palace</MenuItem>
                                </Select>
                            </FormControl>
                        </div>


                        {/* likes and share*/}
                        <div className="flex flex-row gap-2 place-items-center h-min ml-auto mr-5">

                            <div className="flex flex-row items-center gap-1 sm:gap-3 max-w-min rounded-xl sm:rounded-2xl px-2 sm:px-4 h-4 sm:h-8 bg-white">
                                <span className="text-[0.5rem] sm:text-base">77</span>
                                < FaHeart
                                    onClick={() => setLiked(!liked)}
                                    className={`size-2 sm:size-5 ${liked ? "text-[#EE0A0A]" : "text-gray-500"}`}
                                />
                            </div>

                            <div className="rounded-4xl bg-white">
                                < IoMdShareAlt className="text-gray-800 text-center m-[3px] sm:m-1 text-xs sm:text-2xl" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Discount */}

            <div className="bg-gray-400 h-20 sm:h-100 m-4 sm:m-8 rounded-2xl"></div>

            {/* Ticket */}
            <div className="mb-50">
                {tickets}
            </div>

        </div>
    )
};

export default ConcertDetails;