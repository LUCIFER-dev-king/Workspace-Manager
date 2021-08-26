import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { createBoard, createWorkspace, getUser } from "./helpers/homeHelper";
import Workspace from "../../components/Workspace";
import Board from "../../components/Board";
import { UserContext } from "../../context/UserContext/userContext";
import { SET_USER } from "../../context/UserContext/actions.types";
import Header from "../../layout/Header";
import { FaPlus, FaTimes } from "react-icons/fa";

const Home = () => {
  const [_id, set_id] = useState("");
  const [token, setToken] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceType, setWorkspaceType] = useState("");
  const [workspace, setWorkspace] = useState({});
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const workspaceModel = useRef("");
  const boardModel = useRef("");
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { data } = useQuery(getUser);

  useEffect(() => {
    console.log(data);
    if (data) {
      setLoading(false);
      setUser(data.getUser);
      dispatch({
        type: SET_USER,
        payload: data.getUser,
      });
    }
  }, [data]);

  const workspaceModelController = (value) => {
    workspaceModel.current.style.visibility = value;
  };

  const boardModelController = (value) => {
    boardModel.current.style.visibility = value;
  };

  const addWorkspace = async () => {
    const res = await createWorkspaceFunc({
      variables: {
        createWorkSpaceCreateWorkSpaceInput: {
          workspaceName: workspaceName,
        },
      },
    });
    console.log(res);
    // window.location.reload();
  };

  const [createWorkspaceFunc] = useMutation(createWorkspace);

  const [createBoardFun] = useMutation(createBoard);

  const addBoard = async () => {
    const res = await createBoardFun({
      variables: {
        createBoardCreateBoardInput: {
          workspaceId: workspace._id,
          boardName: boardName,
        },
      },
    });

    if (res.data) {
      history.push({
        pathname: "/board",
        state: {
          board: res.data,
          workspace: workspace,
        },
      });
    }
  };

  const toBoard = () => {
    history.push("/board");
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <div
        ref={workspaceModel}
        className='bg-black bg-opacity-25 h-screen w-screen fixed z-10 invisible'
      >
        <div className='mx-40 my-20 rounded bg-white flex justify-start items-center'>
          <div className='w-1/2 h-96'>
            <div className='flex flex-col h-full px-16'>
              <div className='font-semibold text-3xl'>
                Let's buil a Workspace
              </div>
              <div className='font-light text-gray-500 my-1 text-lg'>
                Boost your productivity by making it easier for everyone to
                access boards in one location.
              </div>
              <label htmlFor='workspaceName' className='my-2 font-medium'>
                Workspace Name
              </label>
              <input
                id='workspaceName'
                type='text'
                placeholder='Workspace name'
                onChange={(e) => setWorkspaceName(e.target.value)}
                className='rounded border-2 border-gray-200 p-2 focus:border-transparent focus:ring-2 focus:outline-none'
              />
              <label htmlFor='workpaceDesc' className='mt-4 mb-2 font-medium'>
                Workspace Description {"(Optional)"}
              </label>
              <textarea
                name='workpaceDesc'
                id='workpaceDesc'
                cols='30'
                rows='3'
                className='rounded border-2 border-gray-200 p-2 focus:border-transparent focus:ring-2 focus:outline-none'
              ></textarea>
              <button
                onClick={addWorkspace}
                className='p-2 mt-4 bg-blue-300 text-white hover:bg-blue-500 rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none'
              >
                Continue
              </button>
            </div>
          </div>
          <div
            className='w-1/2'
            style={{
              background: `url('https://a.trellocdn.com/prgb/dist/images/create-team/wavy-border.df0d81969c6394b61c0d.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "34rem",
            }}
          >
            <div className='flex flex-col justify-center items-center mt-20'>
              <div
                onClick={() => {
                  workspaceModelController("hidden");
                }}
                className='text-right  pr-2 py-2'
              >
                close
              </div>
              <div
                className='w-96'
                style={{
                  background: `url('https://a.trellocdn.com/prgb/dist/images/organization/empty-board.d1f066971350650d3346.svg')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "20rem",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={boardModel}
        className='bg-black bg-opacity-25 h-screen w-screen fixed z-10 invisible'
      >
        <div className='mx-auto mt-10 w-72 h-36 transparent rounded bg-white p-2 '>
          <div className='flex justify-between items-center'>
            <label htmlFor='boardName' className='my-2 font-medium'>
              Board Name
            </label>
            <FaTimes
              onClick={() => boardModelController("hidden")}
              className='cursor-pointer'
            />
          </div>
          <input
            id='boardName'
            type='text'
            placeholder='Workspace name'
            onChange={(e) => setBoardName(e.target.value)}
            className='mt-1 rounded w-full border-2 border-gray-200 p-1 focus:border-transparent focus:ring-2 focus:outline-none'
          />
          <button
            onClick={() => {
              addBoard();
            }}
            className='w-full mt-2 p-2 bg-blue-300 text-white hover:bg-blue-500 rounded'
          >
            Submit
          </button>
        </div>
      </div>
      <Header bgHomeChange={true} />

      <div className='container max-w-5xl mx-auto mt-10 z-0'>
        <div className='grid grid-cols-4 gap-1'>
          <div className='col-span-0 '>
            <ul>
              <li className='p-2 font-bold hover:bg-gray-100 rounded cursor-pointer'>
                Boards
              </li>
              <li className='p-2 font-bold hover:bg-gray-100 rounded cursor-pointer'>
                Templates
              </li>
              <li className='p-2 font-bold hover:bg-gray-100 rounded cursor-pointer'>
                Home
              </li>
            </ul>

            <div className='p-2 flex justify-between items-center'>
              <h3 className='font-semibold text-gray-500'>Workspace</h3>
              <FaPlus
                onClick={() => {
                  workspaceModelController("visible");
                }}
                className='p-1 text-xl text-gray-600 hover:bg-gray-200 rounded cursor-pointer'
              />
            </div>
            {user.workspace.map((workspace) => (
              <Workspace key={workspace._id} workspace={workspace} />
            ))}
          </div>

          <div className='col-span-3 '>
            <div>
              <p className='font-semibold'>YOUR WORKPACES </p>

              {user.workspace.map((workspace) => (
                <div className='mt-5' key={workspace._id}>
                  <div className='font-medium'>{workspace.workspaceName}</div>
                  <div className='flex flex-wrap'>
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
                      className='mt-3 w-44 h-20 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded flex flex-col justify-center items-center'
                    >
                      <div className='text-white text-lg p-2'>
                        Create new board
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
