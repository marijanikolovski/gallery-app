import React, { children } from "react";
import { Navbar } from "./Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <h1 className="title">Welcome to Gallery application</h1>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
