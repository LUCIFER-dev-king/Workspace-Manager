import React from "react";

const Header = () => {
  return (
    <div
      className='bg-black max-w-7-xl mx-auto px-2'
      style={{ backgroundColor: "#026AA7" }}
    >
      <div className='relative flex items-center justify-between h-auto p-1 text-lg'>
        <div>Home</div>
        <div>Workspace Manager</div>
        <div className='flex items-center'>
          <div className='bg-grey-800 p-1 rounded-full text-gray-400'>
            Notify
          </div>
          <div>Menu</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
