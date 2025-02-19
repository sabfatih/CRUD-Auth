import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [warning, setWarning] = useState("");

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

                  if (!name || !email || !password || !confPassword || !role)
                    return false;
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
                      className="input"
                      placeholder="name"
                      name="name"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="email"
                      name="email"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="********"
                      name="password"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm password</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="********"
                      name="confPassword"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Role</label>
                  <div className="control">
                    <div className="select is-small">
                      <select name="role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Sign up
                  </button>
                </div>
                {warning.length > 0 ? (
                  <span className="has-text-danger">{warning}</span>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
