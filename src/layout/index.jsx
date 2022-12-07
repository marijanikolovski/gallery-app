import React, { children } from "react";
import { Navbar } from "./Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
