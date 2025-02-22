import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { reset, logoutUser } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      dispatch(logoutUser());
      dispatch(reset());
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/home/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/home/products"}>
              <IoPricetag /> Products
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/home/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
            /home
          </>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Log out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
