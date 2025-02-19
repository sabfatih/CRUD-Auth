import React, { useState } from "react";
import axios from "axios";

const Login = () => {
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
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  if (!email || !password) return false;

                  try {
                    const foundUser = await axios.post(
                      "http://localhost:5000/login",
                      {
                        email,
                        password,
                      }
                    );
                    setWarning("");
                    console.log(foundUser);
                  } catch (e) {
                    console.log(e);
                    setWarning(e.response.data.msg);
                  }
                }}
              >
                <h1 className="title is-2">Sign in</h1>
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
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Login
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

export default Login;
