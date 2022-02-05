import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { createWorkspace } from "../pages/home/helpers/homeHelper";

import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext/userContext";
import { SET_USER_WORKSPACE } from "../context/UserContext/actions.types";

export const WorkspaceModal = ({ workspaceModel }) => {
  const { dispatch } = useContext(UserContext);
  const [workspaceName, setWorkspaceName] = useState("");

  const workspaceModelController = (value) => {
    workspaceModel.current.style.visibility = value;
  };

  const addWorkspace = async () => {
    const res = await createWorkspaceFunc({
      variables: {
        createWorkSpaceInput: {
          workspaceName: workspaceName,
        },
      },
    });

    dispatch({
      type: SET_USER_WORKSPACE,
      payload: res.data.createWorkSpace.workspace,
    });
    workspaceModelController("hidden");
  };

  const [createWorkspaceFunc] = useMutation(createWorkspace);
  return (
    <div
      ref={workspaceModel}
      className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-25 h-screen w-screen z-10 invisible"
    >
      <div className="md:mx-40 h-full md:h-auto md:my-20 rounded bg-white flex flex-col md:flex-row justify-start items-center">
        <div className="w-full md:w-1/2 h-full md:h-96 order-2 md:order-1">
          <div className="flex flex-col h-full px-16">
            <div
              onClick={() => {
                workspaceModelController("hidden");
              }}
              className="block md:hidden mt-10 cursor-pointer ml-auto"
            >
              <FaTimes />
            </div>
            <div className="font-semibold text-3xl">
              Let's build a Workspace
            </div>
            <div className="font-light text-gray-500 my-1 text-base">
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </div>
            <label htmlFor="workspaceName" className="mt-4 mb-2 font-medium">
              Workspace Name
            </label>
            <input
              id="workspaceName"
              type="text"
              placeholder="Workspace name"
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="  p-2 rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none"
            />
            <label htmlFor="workpaceDesc" className="mt-4 mb-2 font-medium">
              Workspace Description {"(Optional)"}
            </label>
            <textarea
              name="workpaceDesc"
              id="workpaceDesc"
              cols="30"
              rows="3"
              className="rounded border-2 border-gray-200 p-2 focus:border-transparent focus:ring-2 focus:outline-none"
            ></textarea>
            <button
              onClick={addWorkspace}
              className="p-2 mt-4 bg-blue-300 text-white hover:bg-blue-500 rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none"
            >
              Continue
            </button>
          </div>
        </div>
        <div
          className="w-1/2 relative hidden md:block order-1 md:order-2"
          style={{
            background: `url('https://a.trellocdn.com/prgb/dist/images/create-team/wavy-border.df0d81969c6394b61c0d.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "34rem",
          }}
        >
          <div
            onClick={() => {
              workspaceModelController("hidden");
            }}
            className="absolute top-5 right-5 cursor-pointer"
          >
            <FaTimes />
          </div>
          <div className="flex flex-col justify-center items-center h-full my-auto">
            <div
              className="w-96"
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
  );
};
