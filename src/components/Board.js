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
      style={{
        background: `url(${board.imageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="mt-3 mr-3 w-44 h-20 cursor-pointer rounded"
      onClick={redirectToBoard}
    >
      <div className="h-full w-full bg-black bg-opacity-25 cursor-pointer rounded">
        <div className="text-white text-lg p-2 font-semibold">
          {board.boardName}
        </div>
      </div>
    </div>
  );
};

export default Board;
