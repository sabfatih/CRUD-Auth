import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [warning, setWarning] = useState("");
  const [required, setRequired] = useState([false, false, false, false]);

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form
                className="box"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const name = e.target.name.value;
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  const confPassword = e.target.confPassword.value;
                  const role = e.target.role.value;

                  if (!name || !email || !password || !confPassword) {
                    setRequired((prev) =>
                      prev.map((item, i) => {
                        if (i == 0) return !name ? true : item;
                        if (i == 1) return !email ? true : item;
                        if (i == 2) return !password ? true : item;
                        if (i == 3) return !confPassword ? true : item;
                        return item;
                      })
                    );

                    return false;
                  }
                  console.log("tess");

                  if (password !== confPassword) {
                    setWarning("Password doesn't match");
                    return false;
                  }
                  if (password.length < 8) {
                    setWarning("Password must be at least 8 character");
                    return false;
                  }

                  try {
                    const newUser = await axios.post(
                      "http://localhost:5000/users",
                      {
                        name,
                        email,
                        password,
                        confPassword,
                        role,
                      }
                    );
                    setWarning("");
                    console.log(newUser);
                  } catch (e) {
                    console.log(e);
                    setWarning(e.response.data.msg);
                  }
                }}
              >
                <h1 className="title is-2">Sign up</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[0] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="name"
                      name="name"
                      autoComplete="off"
                      onChange={() =>
                        setRequired((prev) => [
                          false,
                          prev[1],
                          prev[2],
                          prev[3],
                        ])
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[1] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="email"
                      name="email"
                      autoComplete="off"
                      onChange={() =>
                        setRequired((prev) => [
                          prev[0],
                          false,
                          prev[2],
                          prev[3],
                        ])
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[2] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="********"
                      name="password"
                      autoComplete="off"
                      onChange={() =>
                        setRequired((prev) => [
                          prev[0],
                          prev[1],
                          false,
                          prev[3],
                        ])
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm password</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[3] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="********"
                      name="confPassword"
                      autoComplete="off"
                      onChange={() =>
                        setRequired((prev) => [
                          prev[0],
                          prev[1],
                          prev[2],
                          false,
                        ])
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Role</label>
                  <div className="control">
                    <div className="select is-small is-fullwidth">
                      <select name="role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                {warning.length > 0 ? (
                  <p className="has-text-danger">{warning}</p>
                ) : (
                  ""
                )}
                <div className="field">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Sign up
                  </button>
                </div>
                <p className="has-text-centered">
                  Already have an account?{" "}
                  <Link to={"/login"} className="has-text-weight-bold">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
