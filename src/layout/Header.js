import React from "react";

const Header = ({ bgHomeChange }) => {
  return (
    <div
      className="max-w-7-xl mx-auto px-2 bg-black bg-opacity-20"
      style={bgHomeChange ? { backgroundColor: "#026AA7" } : {}}
    >
      <div className="flex items-center justify-center h-auto">
        <a href="/" className="text-white text-xl p-2 font-semibold">
          Workspace Manager
        </a>
      </div>
    </div>
  );
};

export default Header;
