import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../store/user/slice";
import { Button } from "react-bootstrap";

export const AppLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnLogin = async (e) => {
    e.preventDefault();
    dispatch(login(credentials));
    console.log("login successfully");
    history.push("/");
  };

  return (
    <div>
      <h2 className="fw-bold mb-3 mt-md-4 mb-2 text-center text-uppercase ">
        Login
      </h2>
      <form onSubmit={handleOnLogin}>
        <div>
          <input
            className="mb-2"
            required
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div>
          <input
            className="mb-2"
            required
            placeholder="password"
            type="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>
        <Button type="subimt">Login</Button>
      </form>
    </div>
  );
};
