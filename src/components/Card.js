import React from "react";
import { MdDone } from "react-icons/md";

const Card = ({ card }) => {
  return (
    <div class="mt-2 rounded-b-sm bg-white shadow-md border h-44">
      <div
        style={{
          width: "100%",
          height: "100px",
          background: `url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-t-sm p-4"
      >
        <div className="bg-white text-black w-full p-2 flex flex-col h-full  rounded">
          <div>{card.cardName}</div>
          <div>{card.endDate}</div>
        </div>
      </div>
      <div className="mt-3 m-2 flex justify-center items-center cursor-pointer bg-white rounded border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:outline-none p-2">
        <MdDone />
        <p className="ml-5">Completed</p>
      </div>
    </div>
  );
};

export default Card;
