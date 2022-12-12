import React, { children } from "react";
import { useSelector } from "react-redux";
import { Navigation } from "./Navigation";
import { selectToken, selectActiveUser } from "../store/user/selector";

const DefaultLayout = ({ children }) => {
  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = useSelector(selectToken);

  return (
    <div>
      <header>
        <div>
          <Navigation />
        </div>
        <div>
          {isAuthenticated ? (
            <h4 className="p-5 mt-5">
              User: {activeUser && activeUser.first_name}{" "}
              {activeUser && activeUser.last_name}
            </h4>
          ) : (
            <h4 className="p-5 mt-5">Guest</h4>
          )}
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
