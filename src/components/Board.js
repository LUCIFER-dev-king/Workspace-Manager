import React from "react";
import { useHistory } from "react-router-dom";

const Board = ({ board, workspace }) => {
  const history = useHistory();
  const redirectToBoard = () => {
    history.push({
      pathname: "/board",
      state: {
        board: board,
        workspace: workspace,
      },
    });
  };

  return (
    <div
      onClick={redirectToBoard}
      className='mt-3 mr-3 w-44 h-20 bg-green-50 hover:bg-gray-300 cursor-pointer rounded'
    >
      <div className='text-white text-lg p-2 font-semibold'>
        {board.boardName}
      </div>
    </div>
  );
};

export default Board;
