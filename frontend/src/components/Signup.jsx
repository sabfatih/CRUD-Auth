import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createAndLoginUser,
  getMe,
  resetAuth,
  resetGetMe,
} from "../features/authSlice";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";

const Signup = () => {
  const [required, setRequired] = useState([false, false, false, false]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const dispatch = useDispatch();
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
      toast.success("Sign up successfully");
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

  const signup = async (e) => {
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

    dispatch(createAndLoginUser({ name, email, password, confPassword, role }));
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className="box" onSubmit={(e) => signup(e)}>
                <h1 className="title is-2">Sign up</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${required[0] ? "is-danger" : ""}`}
                      placeholder="Name"
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
                      className={`input ${required[1] ? "is-danger" : ""}`}
                      placeholder="Email"
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
                      type={`${showPassword ? "text" : "password"}`}
                      className={`input ${required[2] ? "is-danger" : ""}`}
                      placeholder="Password"
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
                    <>
                      <input
                        onChange={(e) => {
                          setShowPassword(e.target.checked);
                        }}
                        name="showPassword"
                        type="checkbox"
                        className="mr-1"
                      />
                      <label htmlFor="showPassword" className="is-vcentered">
                        Show password
                      </label>
                    </>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm password</label>
                  <div className="control">
                    <input
                      type={`${showConfPassword ? "text" : "password"}`}
                      className={`input ${required[3] ? "is-danger" : ""}`}
                      placeholder="Confirm password"
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
                    <>
                      <input
                        onChange={(e) => {
                          setShowConfPassword(e.target.checked);
                        }}
                        name="showPassword"
                        type="checkbox"
                        className="mr-1"
                      />
                      <label htmlFor="showPassword" className="is-vcentered">
                        Show confirmed password
                      </label>
                    </>
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
                <div className="field">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
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
