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
    if (getMeUser && getMeUser.role !== "admin") {
      toast.error("Forbidden Access!");
      navigate("/home/dashboard");
    } else {
      getAllUsers();
    }
  }, [getMeUser, navigate]);
  return (
    getMeUser &&
    getMeUser.role === "admin" && (
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
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.role}</th>
                  <th>
                    <div className="buttons">
                      <Link
                        to={`/home/profile/${user.uuid}`}
                        className="button is-small is-info"
                      >
                        Edit
                      </Link>
                      <button className="button is-small is-danger">
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    )
  );
};

export default UserList;
