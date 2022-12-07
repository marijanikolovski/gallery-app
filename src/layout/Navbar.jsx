import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../store/user/slice";
import { selectToken, selectActiveUser } from "../store/user/selector";

export const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectToken);
  const activeUser = useSelector(selectActiveUser);

  async function handleLogout() {
    dispatch(logout());
    console.log("logout successfully");
    history.replace("/login");
  }

  return (
    <nav>
      {isAuthenticated ? (
        <h4>
          User: {activeUser && activeUser.first_name}{" "}
          {activeUser && activeUser.last_name}
        </h4>
      ) : (
        <h4>Guest</h4>
      )}
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <button type="submit" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <Link to="/">Galleries</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/galleries">Galleries</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
