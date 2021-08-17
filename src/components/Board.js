import React from "react";

const Board = ({ board }) => {
  return (
    <div className='mt-1 mr-5 w-44 h-20 bg-green-50 hover:bg-gray-300 cursor-pointer rounded'>
      <div className='text-white text-lg p-2 font-semibold'>
        {board.boardName}
      </div>
    </div>
  );
};

export default Board;
