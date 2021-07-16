import React from "react";

const Card = ({ cardTitle }) => {
  return (
    <div className='w-48 h-20 bg-black rounded'>
      <div className='text-white text-lg p-2 font-semibold'>{cardTitle}</div>
    </div>
  );
};

export default Card;
