import React, { useState, useEffect, useContext } from "react";
import Card from "../../components/Card";
import Base from "../../layout/Base";
import { useMutation, useQuery } from "@apollo/client";
import { createWorkspace, getUser } from "./helpers/homeHelper";
import Workspace from "../../components/Workspace";
import { FaPlus } from "react-icons/fa";
import Board from "../../components/Board";
import { UserContext } from "../../context/UserContext/userContext";
import { SET_USER } from "../../context/UserContext/actions.types";

const Home = () => {
  const [_id, set_id] = useState("");
  const [token, setToken] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceType, setWorkspaceType] = useState("");
  const [loading, setLoading] = useState(true);
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

  // console.log(user);

  const addWorkspace = async () => {
    const res = await createWorkspaceFunc({
      variables: {
        createWorkSpaceUserId: _id,
        createWorkSpaceWorkspaceName: "sd",
        createWorkSpaceWorkspaceType: "sdfs",
      },
    });
    console.log(res);
  };

  const [createWorkspaceFunc] = useMutation(createWorkspace);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Base>
      <div className='container max-w-5xl mx-auto mt-10'>
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
              <FaPlus className='p-1 text-xl text-gray-600 hover:bg-gray-200 rounded cursor-pointer' />
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
                  <div className='flex'>
                    {workspace.boards.map((board, i) => (
                      <Board key={board._id} board={board} />
                    ))}
                  </div>
                  <div className='mt-3 mr-5 w-44 h-20 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded flex flex-col justify-center items-center'>
                    <div className='text-white text-lg p-2'>
                      Create new board
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
