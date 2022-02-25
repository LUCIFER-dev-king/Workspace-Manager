import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { createBoard } from "../pages/home/helpers/homeHelper";

import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext/userContext";
import { SET_USER_WORKSPACE } from "../context/UserContext/actions.types";
import { backgroundImageUrls } from "../utils";

export const BoardModal = ({ boardModel, currentWorkspace }) => {
  const { dispatch } = useContext(UserContext);
  const [boardName, setBoardName] = useState("");

  const boardModelController = (value) => {
    boardModel.current.style.visibility = value;
  };

  const [createBoardFun] = useMutation(createBoard);

  const addBoard = async () => {
    const res = await createBoardFun({
      variables: {
        createBoardCreateBoardInput: {
          workspaceId: currentWorkspace._id,
          boardName: boardName,
          imageUrl: backgroundImageUrls[Math.floor(Math.random() * 10)],
          boardId: " ",
          listOfCards: [],
        },
      },
    });

    dispatch({
      type: SET_USER_WORKSPACE,
      payload: res.data.createBoard.workspace,
    });
    boardModelController("hidden");
  };

  return (
    <div
      ref={boardModel}
      className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-25 h-screen w-screen z-10 invisible"
    >
      <div className="mx-auto mt-10 w-72 h-36 transparent rounded bg-white p-2 ">
        <div className="flex justify-between items-center">
          <label htmlFor="boardName" className="my-2 font-medium">
            Board Name
          </label>
          <FaTimes
            onClick={() => boardModelController("hidden")}
            className="cursor-pointer"
          />
        </div>
        <input
          id="boardName"
          type="text"
          placeholder="Workspace name"
          onChange={(e) => setBoardName(e.target.value)}
          className="mt-1 rounded w-full border-2 border-gray-200 p-1 focus:border-transparent focus:ring-2 focus:outline-none"
        />
        <button
          onClick={() => {
            addBoard();
          }}
          className="w-full mt-2 p-2 bg-blue-300 text-white hover:bg-blue-500 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
