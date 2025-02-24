import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

const ToastLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        stacked
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default ToastLayout;
