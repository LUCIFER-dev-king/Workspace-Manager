import React, { useState, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext/userContext";

const Workspace = ({ workspace }) => {
  return (
    <div className='p-2 font-semibold flex justify-between hover:bg-gray-200 rounded cursor-pointer'>
      <h5>{workspace.workspaceName}'s Workspace</h5>
    </div>
  );
};

export default Workspace;
