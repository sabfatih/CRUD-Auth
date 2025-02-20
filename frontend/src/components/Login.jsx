import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/authSlice.js";

const Login = () => {
  const [warning, setWarning] = useState("");
  const [required, setRequired] = useState([false, false]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );

  const auth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      if (!email) {
        setRequired((prev) => [true, prev[1]]);
      }
      if (!password) {
        setRequired((prev) => [prev[0], true]);
      }
      return false;
    }

    dispatch(loginUser({ email, password }));

    try {
      const foundUser = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setWarning("");
      console.log(foundUser);
    } catch (e) {
      console.log(e);
      setWarning(e.response.data.msg);
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className="box" onSubmit={(e) => auth(e)}>
                <h1 className="title is-2">Sign in</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[0] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="email"
                      name="email"
                      autoComplete="off"
                      onChange={() => setRequired((prev) => [false, prev[1]])}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[1] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="********"
                      name="password"
                      autoComplete="off"
                      onChange={() => setRequired((prev) => [prev[0], false])}
                    />
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
                    Login
                  </button>
                </div>
                <p className="has-text-centered">
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="has-text-weight-bold">
                    Sign up
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

export default Login;
