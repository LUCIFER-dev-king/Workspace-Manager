import React, { useEffect, useContext, useRef } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getUser } from "../pages/home/helpers/homeHelper";

import Workspace from "../components/Workspace";
import { FaPlus } from "react-icons/fa";
import { UserContext } from "../context/UserContext/userContext";
import {
  SET_USER,
  SET_USER_WORKSPACE,
} from "../context/UserContext/actions.types";
import { WorkspaceModal } from "../modals/WorkspaceModal";

const Base = ({ children }) => {
  const workspaceModel = useRef("");
  const {
    state: { workspaces },
    dispatch,
  } = useContext(UserContext);
  const { data, loading } = useQuery(getUser);
  const history = useHistory();

  const workspaceModelController = (value) => {
    workspaceModel.current.style.visibility = value;
  };

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: SET_USER,
        payload: data.getUser,
      });
      if (data.getUser) {
        dispatch({
          type: SET_USER_WORKSPACE,
          payload: data.getUser.workspace,
        });
      }
    }
  }, [loading]);

  return (
    <div className="relative z-0 container-xl mx-auto overflow-x-hidden">
      <Header bgHomeChange={true} />

      <WorkspaceModal workspaceModel={workspaceModel} />

      <div className="max-w-5xl mx-auto mt-4 md:mt-10 z-0">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-12 md:col-span-3 sticky top-0">
            <ul className="flex p-2 md:p-0 md:block">
              <Link className="w-1/2" to="/">
                <li className=" text-center md:text-left md:w-full m-2 md:m-0 bg-gray-100 md:bg-transparent p-2 font-bold hover:bg-gray-100 rounded cursor-pointer">
                  Boards
                </li>
              </Link>

              <Link className="w-1/2" to="/home">
                <li className=" text-center md:text-left md:w-full m-2 md:m-0 bg-gray-100 md:bg-transparent p-2 font-bold hover:bg-gray-100 rounded cursor-pointer">
                  Home
                </li>
              </Link>
              <div
                onClick={() => {
                  localStorage.removeItem("jwt");
                  history.push("/signin");
                }}
                className="w-1/2 md:w-full"
              >
                <li className="  text-center md:text-left md:w-full m-2 md:m-0 bg-gray-100 md:bg-transparent p-2 font-bold hover:bg-gray-100 rounded cursor-pointer">
                  Log Out
                </li>
              </div>
            </ul>

            <div className="py-2 px-4 md:p-2 flex justify-between items-center">
              <h3 className="font-semibold text-gray-500">Workspace</h3>
              <FaPlus
                onClick={() => {
                  workspaceModelController("visible");
                }}
                className="p-1 text-xl text-gray-600 hover:bg-gray-200 rounded cursor-pointer"
              />
            </div>

            {Object.keys(workspaces).length !== 0 &&
              workspaces.map((workspace) => (
                <Workspace key={workspace._id} workspace={workspace} />
              ))}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Base;
