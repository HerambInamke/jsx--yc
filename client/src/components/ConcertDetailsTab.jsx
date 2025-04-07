import React from "react"
import { FaHeart } from "react-icons/fa";


const TickectDetailsTab = (props) => {

    const [liked, setLiked] = React.useState(false);

  return (
    <div 
        className="
            bg-white h-25 sm:h-45 mx-4 sm:mx-9 my-3 sm:my-5 rounded-xl sm:rounded-2xl 
            drop-shadow-[3px_3px_3px_rgba(0,0,0,0.25)] 
            border-[1px] border-[rgba(0,0,0,0.16)]
            flex" 
    >
        {/* Date Bg */}
        <div className="bg-[#7407aa46] w-25 sm:w-40 ml-2 sm:ml-2 my-2 sm:my-1.5 sm:py-3 sm:px-2 place-content-center text-center "> 
            <h2 className="font-extrabold text-sm sm:text-2xl">{props.date}</h2>
            <span className="font-light text-xs sm:text-base">{props.time}</span>
        </div>

        {/* Details */}
        <div className="w-full mr-2 sm:m-2 flex flex-col "> 
            {/* artist name and location */}
            <h1 className="text-sm sm:text-3xl font-bold mt-2 ml-2">{props.name}</h1>
            <p className="text-gray-500 text-xs sm:text-lg ml-2">{props.location}</p>

            {/* like and see ticket */}
            <div className="flex justify-end gap-2 sm:gap-3 place-items-center mt-auto mb-1 sm:mb-0">
                < FaHeart 
                    onClick={() => setLiked(!liked)}
                    className={`size-4 sm:size-6 cursor-pointer ${liked ? "text-[#EE0A0A]" : "text-gray-500"}`}
                />
                <button className="bg-[#510378] text-white text-[0.7rem] sm:text-[1rem] font-[600] h-6 sm:h-8 w-25 sm:w-40 rounded-xl">SEE TICKETS</button>
            </div>
        </div>

    </div>
  )
};

export default TickectDetailsTab;