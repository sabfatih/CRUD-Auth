import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getMe,
  loginUser,
  resetAuth,
  resetGetMe,
} from "../features/authSlice.js";
import { toast } from "react-toastify";

const Login = () => {
  const [required, setRequired] = useState([false, false]);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { getMeSuccess } = useSelector((state) => state.getMe);

  useEffect(() => {
    dispatch(resetGetMe());
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (getMeSuccess) {
      toast.info("Please Log out first");
      dispatch(resetGetMe());
      navigate("/home/dashboard");
    }
  }, [dispatch, getMeSuccess]);

  useEffect(() => {
    if (user || isSuccess) {
      toast.dismiss();
      toast.success("Sign in successfully");
      navigate("/home/dashboard");
      dispatch(resetAuth());
      dispatch(resetGetMe());
    }
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      toast.warning(message);
    }
  }, [isError, toast]);

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
    dispatch(resetAuth());
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className="box" onSubmit={(e) => auth(e)}>
                {/* {isError && (
                  <p className="has-text-centered has-text-danger">{message}</p>
                )} */}
                <h1 className="title is-2">Sign in</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        required[0] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="Email"
                      name="email"
                      autoComplete="off"
                      onChange={() => {
                        setRequired((prev) => [false, prev[1]]);
                        toast.dismiss();
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      className={`input ${
                        required[1] ? "is-danger is-outlined" : ""
                      }`}
                      placeholder="Password"
                      name="password"
                      autoComplete="off"
                      onChange={() => {
                        setRequired((prev) => [prev[0], false]);
                        toast.dismiss();
                      }}
                    />
                    <>
                      <input
                        onChange={(e) => {
                          setShowPassword(e.target.checked);
                        }}
                        name="showPassword"
                        type="checkbox"
                        className="mr-1"
                      />
                      <label
                        htmlFor="showPassword"
                        className="is-vcentered is-size-7"
                      >
                        Show password
                      </label>
                    </>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
                <p className="has-text-centered">
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    onClick={() => {
                      toast.dismiss();
                      dispatch(resetAuth());
                    }}
                    className="has-text-weight-bold"
                  >
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
