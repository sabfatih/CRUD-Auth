import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe, resetGetMe } from "../features/authSlice";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getMeUser, getMeError } = useSelector((state) => state.getMe);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (getMeError) {
      toast.error("Forbidden Access!");
      dispatch(resetGetMe());
      navigate("/login");
    }
  }, [getMeError, navigate]);
  return (
    <>
      <Navbar userRole={getMeUser && getMeUser.role ? getMeUser.role : null} />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar
            userRole={getMeUser && getMeUser.role ? getMeUser.role : null}
          />
        </div>
        <div className="column has-background-light">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
