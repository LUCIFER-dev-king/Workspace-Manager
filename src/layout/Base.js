import React from "react";
import Header from "./Header";

const Base = ({ children }) => {
  return (
    <div className='z-0'>
      <Header />
      {children}
    </div>
  );
};

export default Base;
