import React, { useState, useEffect, useContext } from "react";
import Card from "../../components/Card";
import Base from "../../layout/Base";
import { useMutation, useQuery } from "@apollo/client";
import { createWorkspace, getUser } from "./helpers/homeHelper";
import Workspace from "../../components/Workspace";
import { FaCross, FaPlus } from "react-icons/fa";
import Board from "../../components/Board";
import { UserContext } from "../../context/UserContext/userContext";
import { SET_USER } from "../../context/UserContext/actions.types";
import Header from "../../layout/Header";

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
    <div>
      <div className='bg-black bg-opacity-25 h-screen w-screen fixed z-10'>
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
              <label htmlFor='workspaceName' className='my-1 font-medium'>
                Workspace Name
              </label>
              <input
                type='text'
                placeholder='Workspace name'
                className='rounded border-2 border-gray-200 p-2 focus:border-transparent focus:ring-2 focus:outline-none'
              />
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
              <div className='text-right  pr-2 py-2'>close</div>
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
      <Header />

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
    </div>
  );
};

export default Home;
