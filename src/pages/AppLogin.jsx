import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../store/user/slice";

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
      <h2>Login</h2>
      <form onSubmit={handleOnLogin}>
        <div>
          <input
            required
            type="email"
            placeholder="email"
            value={credentials.email}
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            placeholder="password"
            type="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>
        <button type="subimt">Login</button>
      </form>
    </div>
  );
};
