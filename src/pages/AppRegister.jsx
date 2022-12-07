import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../store/user/slice";

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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
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
            required
            value={credentials.last_name}
            placeholder="Lasta Name"
            onChange={({ target }) =>
              setCredentials({ ...credentials, last_name: target.value })
            }
          />
        </div>
        <div>
          <input
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
          <label>Terms and Conditions</label>
          <input
            required
            type="checkbox"
            name="terms"
            value={true}
            onChange={({ target }) =>
              setCredentials({ ...credentials, terms: target.checked })
            }
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};
