import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Layout;
