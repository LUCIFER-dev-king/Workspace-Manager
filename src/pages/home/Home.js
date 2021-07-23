import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Base from "../../layout/Base";
import { FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { createWorkspace, getUser } from "./helpers/homeHelper";

const Home = () => {
  const [_id, set_id] = useState("");
  const [token, setToken] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceType, setWorkspaceType] = useState("");
  const { data } = useQuery(getUser);
  console.log(data);
  useEffect(() => {
    // if (localStorage.getItem("jwt")) {
    //   const { _id, token } = JSON.parse(localStorage.getItem("jwt"));
    //   set_id(_id);
    //   setToken(token);
    // }
  }, []);

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

  return (
    <Base>
      <div className='container max-w-5xl mx-auto mt-10'>
        <div className='grid grid-cols-4 gap-1'>
          <div className='col-span-0'>
            <ul>
              <li>Boards</li>
              <li>Templates</li>
              <li>Home</li>
            </ul>
            <hr />
            <div className='flex justify-between'>
              <h5>Workspaces</h5>
              <FaTimes onClick={addWorkspace} />
            </div>
          </div>
          <div className='col-span-3'>
            <div>
              <p>your Workspace </p>
              <Card cardTitle={"Test"} />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;