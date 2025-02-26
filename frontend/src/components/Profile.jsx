import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser, resetAuth, resetGetMe } from "../features/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getMeUser } = useSelector((state) => state.getMe);
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [resetPopUp, setResetPopUp] = useState(false);

  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCurPassword, setUserCurPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userConfNewPassword, setUserConfNewPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const [required, setRequired] = useState([false, false, false, false, false]);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setUser(response.data);
    setUserName(response.data.name);
    setUserEmail(response.data.email);
    setUserRole(response.data.role);
  };
  useEffect(() => {
    if (getMeUser) {
      if (getMeUser.role !== "admin" && getMeUser.uuid !== id) {
        toast.error("Forbidden Access!");
        navigate("/home/dashboard");
      } else {
        console.log("tes");
        getUserById();
      }
    }
  }, [getMeUser, dispatch, navigate, id]);

  const resetUser = () => {
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
    setEditMode(false);
    setResetPopUp(false);
  };

  const editUser = async (e) => {
    e.preventDefault();
    console.log(e);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    const curPassword = e.target.curPassword.value;
    const newPassword = e.target.newPassword.value;
    const confNewPassword = e.target.confNewPassword.value;

    if (!name || !email) {
      setRequired((prev) =>
        required.map((item, i) => {
          if (i == 0) return !name ? true : item;
          if (i == 1) return !email ? true : item;
          if (curPassword || newPassword || confNewPassword) {
            if (i == 2) return !curPassword ? true : item;
            if (i == 3) return !newPassword ? true : item;
            if (i == 4) return !confNewPassword ? true : item;
          }
          return item;
        })
      );
      return false;
    }

    try {
      const updatedUser = await axios.patch(
        `http://localhost:5000/users/${id}`,
        { name, email, role }
      );

      toast.success(updatedUser.data.msg);
      getUserById();
      setEditMode(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.msg);
    }
  };

  const [LogoutPopUp, setLogoutPopUp] = useState(false);
  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetGetMe());
      dispatch(resetAuth());
      toast.success("Log out successfully");
      setLogoutPopUp(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={`modal ${resetPopUp ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Are you sure to cancel?</p>
            <button
              onClick={() => setResetPopUp(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <p className="is-size-4">Your progress will be unsaved</p>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button onClick={() => setResetPopUp(false)} className="button">
                No
              </button>
              <button onClick={resetUser} className="button is-danger">
                Yes
              </button>
            </div>
          </footer>
        </div>
      </div>

      <div className={`modal ${LogoutPopUp ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Are you sure to log out?</p>
            <button
              onClick={() => setLogoutPopUp(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button onClick={() => setLogoutPopUp(false)} className="button">
                Cancel
              </button>
              <button onClick={logout} className="button is-danger">
                Log out
              </button>
            </div>
          </footer>
        </div>
      </div>

      <h1 className="title">User profile</h1>
      <form onSubmit={(e) => editUser(e)} className="mx-4">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              readOnly={!editMode}
              type="text"
              className={`${required[0] ? "is-red" : ""} input`}
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              readOnly={!editMode}
              type="text"
              className={`${required[1] ? "is-red" : ""} input`}
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div hidden={editMode ? !changePasswordMode : true}>
          <div className="field">
            <label className="label">Current Password</label>
            <div className="control">
              <input
                readOnly={!editMode}
                type="text"
                className={`${required[2] ? "is-red" : ""} input`}
                name="curPassword"
                value={userCurPassword}
                onChange={(e) => setUserCurPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                readOnly={!editMode}
                type="text"
                className={`${required[3] ? "is-red" : ""} input`}
                name="newPassword"
                value={userNewPassword}
                onChange={(e) => setUserNewPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm New Password</label>
            <div className="control">
              <input
                readOnly={!editMode}
                type="text"
                className={`${required[4] ? "is-red" : ""} input`}
                name="confNewPassword"
                value={userConfNewPassword}
                onChange={(e) => setUserConfNewPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className="field">
          <div className="label">
            <div className="buttons">
              {changePasswordMode ? (
                <button
                  type="button"
                  onClick={() => setChangePasswordMode(false)}
                  className="button is-small is-right"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setChangePasswordMode(true)}
                  className="button is-small is-right"
                >
                  Change password
                </button>
              )}
            </div>
          </div>
        </div>

        {/* {editMode && (
          <>
            {changePasswordMode && (
              <>
                <div className="field">
                  <label className="label">Current Password</label>
                  <div className="control">
                    <input
                      readOnly={!editMode}
                      type="text"
                      className={`${required[2] ? "is-red" : ""} input`}
                      name="curPassword"
                      value={userCurPassword}
                      onChange={(e) => setUserCurPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">New Password</label>
                  <div className="control">
                    <input
                      readOnly={!editMode}
                      type="text"
                      className={`${required[3] ? "is-red" : ""} input`}
                      name="newPassword"
                      value={userNewPassword}
                      onChange={(e) => setUserNewPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm New Password</label>
                  <div className="control">
                    <input
                      readOnly={!editMode}
                      type="text"
                      className={`${required[4] ? "is-red" : ""} input`}
                      name="confNewPassword"
                      value={userConfNewPassword}
                      onChange={(e) => setUserConfNewPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="field">
              <div className="label">
                <div className="buttons">
                  {changePasswordMode ? (
                    <button
                      type="button"
                      onClick={() => setChangePasswordMode(false)}
                      className="button is-small is-right"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setChangePasswordMode(true)}
                      className="button is-small is-right"
                    >
                      Change password
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )} */}

        <div className="field">
          <label className="label">Role</label>
          <div className="control">
            <div className="select">
              <select
                name="role"
                value={userRole}
                disabled={!editMode}
                onDoubleClick={() => {
                  if (editMode) {
                    if (getMeUser.role !== "admin") {
                      toast.warning(
                        "You can't change role unless you're admin"
                      );
                    } else {
                      if (userRole === "admin") {
                        toast.warning("You can't change admin's role");
                      }
                    }
                  }
                }}
                onChange={(e) => {
                  if (getMeUser.role === "admin") {
                    if (userRole === "admin") {
                      toast.warning("You can't change admin's role");
                    } else {
                      setUserRole(e.target.value);
                    }
                  } else {
                    e.preventDefault();
                    toast.warning("You can't change role unless you're admin");
                  }
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* <input
              readOnly={true}
              onDoubleClick={() =>
                editMode &&
                toast.warning(
                  getMeUser.role === "admin"
                    ? "You can't change admin's role"
                    : "You can't change role unless you're admin"
                )
              }
              type="text"
              className="input"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              autoComplete="off"
            /> */}
          </div>
        </div>

        <div className="buttons">
          {editMode ? (
            <>
              <button
                type="button"
                onClick={() => {
                  if (userName != user.name || userEmail != user.email) {
                    setResetPopUp(true);
                  } else {
                    setEditMode(false);
                  }
                }}
                className="button is-grey"
              >
                Cancel
              </button>
              <button type="submit" className="button is-success">
                Apply changes
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="button is-primary"
              >
                Edit profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setLogoutPopUp(true);
                }}
                className="button is-danger"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Profile;
