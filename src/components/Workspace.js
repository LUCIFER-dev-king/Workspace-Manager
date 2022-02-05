import React from "react";

const Workspace = ({ workspace }) => {
  return (
    <div className="p-2 font-semibold flex justify-between hover:bg-gray-200 rounded cursor-pointer">
      <h5>{workspace.workspaceName}'s Workspace</h5>
    </div>
  );
};

export default Workspace;
