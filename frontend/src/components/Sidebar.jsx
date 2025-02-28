import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoPersonSharp,
  IoPersonCircle,
} from "react-icons/io5";

const Sidebar = ({ userRole }) => {
  return (
    <div className="column is-2">
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
        {(userRole === "SUPERADMIN" || userRole === "admin") && (
          <>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/home/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          {/* <li>
            <button onClick={() => {}} className="button is-white is-clipped">
              <IoLogOut /> Log out
            </button>
          </li> */}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
