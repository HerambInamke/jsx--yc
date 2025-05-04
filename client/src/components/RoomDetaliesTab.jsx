import React from "react";
import { Rating } from "@mui/material";

const RoomDetailsTab = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`
        bg-white mx-4 sm:mx-2 my-3 sm:my-5 rounded-xl sm:rounded-2xl 
        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.25)] 
        border flex cursor-pointer transition-all duration-200
        ${props.isSelected ? 'border-purple-600 ring-2 ring-purple-400' : 'border-[rgba(0,0,0,0.16)]'}
      `}
    >
      {/* Room Image */}
      <img
        className="object-cover aspect-square w-[5.5rem] sm:w-[13rem] rounded-lg sm:rounded-2xl"
        src={props.coverImg}
        alt={props.name}
      />

      {/* Room Info Section */}
      <div className="w-full flex flex-row p-1 sm:p-4">
        {/* Name, Location, Rating */}
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-[0.7rem] sm:text-3xl font-semibold">{props.name}</h1>
          <p className="text-gray-500 text-[0.5rem] sm:text-base">{props.location}</p>
          <Rating
            name="rating"
            value={props.rating}
            precision={0.5}
            readOnly
            sx={{ fontSize: { xs: "0.85rem", md: "1.7rem" } }}
          />
        </div>

        {/* Price & Button */}
        <div className="flex flex-col ml-auto items-center justify-between">
          <h3 className="text-[0.75rem] sm:text-2xl font-light">INR {props.price}</h3>
          <button className="bg-[#510378] text-white mt-auto text-[0.6rem] sm:text-[1.2rem] font-light h-5 sm:h-10 w-18 sm:w-40 rounded-md sm:rounded-lg">
            {props.isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsTab;