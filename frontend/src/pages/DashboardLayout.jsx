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
    dispatch(resetGetMe());
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (getMeError) {
      toast.error("Forbidden Access!");
      dispatch(resetGetMe());
      navigate("/login");
    }
  }, [getMeError, navigate, dispatch]);
  return (
    getMeUser && (
      <>
        <Navbar user={getMeUser && (getMeUser ? getMeUser : null)} />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <Sidebar
            userRole={getMeUser && getMeUser.role ? getMeUser.role : null}
          />
          <div className="column has-background-light">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </>
    )
  );
};

export default DashboardLayout;
