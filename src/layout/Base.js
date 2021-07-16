import React from "react";
import Header from "./Header";

const Base = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Base;
