import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserList = () => {
  const navigate = useNavigate();
  const { getMeUser } = useSelector((state) => state.getMe);

  useEffect(() => {
    if (getMeUser && getMeUser.role !== "admin") {
      toast.error("Forbidden Access!");
      navigate("/home/dashboard");
      return null;
    }
  }, [getMeUser, navigate]);

  return (
    getMeUser &&
    getMeUser.role !== "admin" && (
      <>
        <h1 className="title">Users</h1>
        <h2 className="subtitle">List of users</h2>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ch 3882h829rh92h</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </>
    )
  );
};

export default UserList;
