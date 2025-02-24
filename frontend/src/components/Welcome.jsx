import React from "react";
import { useSelector } from "react-redux";

const Welcome = ({}) => {
  const { getMeUser } = useSelector((state) => state.getMe);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back {getMeUser && getMeUser.name}...
      </h2>
    </div>
  );
};

export default Welcome;
