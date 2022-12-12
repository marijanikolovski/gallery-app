import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../store/user/slice";
import { selectToken, selectActiveUser } from "../store/user/selector";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export const Navigation = () => {
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
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {isAuthenticated ? (
              <>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-4"
                  to="/"
                >
                  Galleries
                </Link>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-2"
                  to="/my-galleries"
                >
                  My Galleries
                </Link>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-2"
                  to="/create"
                >
                  Create New Gallery
                </Link>
                <Button type="submit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-4"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-4"
                  to="/register"
                >
                  Register
                </Link>
                <Link
                  className="navbar-brand navbar-item mt-3 mb-3 ml-4"
                  to="/galleries"
                >
                  All Galleries
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
