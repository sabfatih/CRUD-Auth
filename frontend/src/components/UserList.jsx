import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserList = () => {
  const navigate = useNavigate();
  const { getMeUser } = useSelector((state) => state.getMe);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  useEffect(() => {
    if (
      getMeUser &&
      (getMeUser.role === "SUPERADMIN" || getMeUser.role === "admin")
    ) {
      getAllUsers();
    } else {
      toast.error("Forbidden Access!");
      navigate("/home/dashboard");
    }
  }, [getMeUser, navigate]);
  return (
    getMeUser &&
    (getMeUser.role === "SUPERADMIN" || getMeUser.role === "admin") && (
      <div className="mx-4">
        <h1 className="title">Users</h1>
        <h2 className="subtitle">List of users</h2>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr
                  key={i}
                  className="is-clickable"
                  onClick={() => navigate(`/home/profile/${user.uuid}`)}
                >
                  <th>{i + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th
                    className={user.role === "admin" ? "has-text-warning" : ""}
                  >
                    {user.role}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserList;
