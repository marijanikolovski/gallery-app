import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../store/user/slice";
import { Button } from "react-bootstrap";

export const AppRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (credentials.password_confirmation !== credentials.password) {
      alert("Password and confirm password should be same!");
      return;
    }

    dispatch(register(credentials));
    console.log("register successfully");
    history.push("/");
  }

  return (
    <div>
      <h2 className="fw-bold mb-3 mt-md-4 mb-2 text-center text-uppercase ">
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="mb-2"
            required
            value={credentials.first_name}
            placeholder="First Name"
            onChange={({ target }) =>
              setCredentials({ ...credentials, first_name: target.value })
            }
          />
        </div>
        <div>
          <input
            className="mb-2"
            required
            value={credentials.last_name}
            placeholder="Last Name"
            onChange={({ target }) =>
              setCredentials({ ...credentials, last_name: target.value })
            }
          />
        </div>
        <div>
          <input
            className="mb-2"
            required
            value={credentials.email}
            type="email"
            placeholder="Email"
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div>
          <input
            className="mb-2"
            required
            value={credentials.password}
            type="password"
            placeholder="Password"
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Confirm password"
            value={credentials.password_confirmation}
            onChange={({ target }) =>
              setCredentials({
                ...credentials,
                password_confirmation: target.value,
              })
            }
          />
        </div>
        <div>
          <label className="mb-2">I accept terms and conditions.</label>
          <input
            className="mb-2"
            required
            type="checkbox"
            name="terms"
            value={true}
            onChange={({ target }) =>
              setCredentials({ ...credentials, terms: target.checked })
            }
          />
        </div>
        <Button type="onsubimt">Register</Button>
      </form>
    </div>
  );
};
