import React from "react"
import { Rating } from "@mui/material";

const HotelDetailsTab = (props) => {

  return (
    <div 
        className="
            bg-white h-25 sm:h-2/12 mx-4 sm:mx-9 my-3 sm:my-5 rounded-xl sm:rounded-2xl 
            drop-shadow-[3px_3px_3px_rgba(0,0,0,0.25)] 
            border-[1px] border-[rgba(0,0,0,0.16)]
            flex" 
    >
        {/* Hotel Image */}
        <img 
            className="object-cover aspect-square w-20 sm:w-32 rounded-lg sm:rounded-2xl"
            src={props.coverImg}
            alt=""
        />

        {/* Details */}
        <div className="w-full flex flex-row p-1 sm:p-4">

            {/* Name, Location, rating */}
            <div className="flex flex-col h-full justify-between"> 
                <h1 className="text-[0.7rem] sm:text-3xl ">{props.name}</h1>
                <p className="text-gray-500 text-[0.5rem] sm:text-base basis-15">{props.location}</p>
                < Rating 
                    name="rating" 
                    defaultValue={props.rating} 
                    precision={0.5} 
                    readOnly
                    sx={{
                        fontSize: {
                            xs: '0.85rem', 
                            md: '1.7rem',
                        }
                    }}
                />
            </div>

            {/* Price and Next button */}
            <div className="flex flex-col ml-auto place-items-center">
                <h3 className="text-[0.75rem] sm:text-2xl font-light">INR {props.price}</h3>
                <button className="bg-festival-primary text-white mt-auto text-[0.6rem] sm:text-[1.2rem] font-[300] h-5 sm:h-10 w-18 sm:w-40 rounded-md sm:rounded-lg">NEXT</button>
            </div>

        </div>

    </div>
  )
};

export default HotelDetailsTab;