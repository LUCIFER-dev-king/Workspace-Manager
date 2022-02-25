import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../layout/Base";
import Board from "../../components/Board";
import { UserContext } from "../../context/UserContext/userContext";
import { BoardModal } from "../../modals/BoardModal";

const Landing = () => {
  const {
    state: { workspaces },
  } = useContext(UserContext);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("jwt"));
  const [workspace, setWorkspace] = useState({});
  const boardModel = useRef("");

  const boardModelController = (value) => {
    boardModel.current.style.visibility = value;
  };

  if (user === null) {
    history.push("/signin");
  }

  return (
    <Base>
      <BoardModal boardModel={boardModel} currentWorkspace={workspace} />
      <div className="p-2 md:p-0 col-span-12 md:col-span-9 h-screen overflow-y-hidden">
        <div>
          <p className="font-semibold">YOUR WORKPACES </p>

          {Object.keys(workspaces).length ? (
            workspaces.map((workspace) => (
              <div className="mt-5" key={workspace._id}>
                <div className="font-medium">{workspace.workspaceName}</div>
                <div className="flex flex-wrap">
                  {workspace.boards.map((board, i) => (
                    <Board
                      key={board._id}
                      board={board}
                      workspace={workspace}
                    />
                  ))}
                  <div
                    onClick={() => {
                      boardModelController("visible");
                      setWorkspace(workspace);
                    }}
                    className="mt-3 w-44 h-20 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded flex flex-col justify-center items-center"
                  >
                    <div className="text-white text-lg p-2">
                      Create new board
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div class="mt-5">No workspace found</div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Landing;
