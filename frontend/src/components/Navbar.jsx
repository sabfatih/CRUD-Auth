import React from "react";
import { NavLink, Link } from "react-router-dom";

import adminLogo from "../../public/customer-call.png";
import userLogo from "../../public/user.png";

const Navbar = ({ userRole }) => {
  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink to="/dashboard" className="navbar-item">
          <img
            src={userRole === "admin" ? adminLogo : userLogo}
            width="28"
            height="28"
          />
        </NavLink>
      </div>

      {/* <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to={"/signup"} className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to={"/login"} className="button is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
