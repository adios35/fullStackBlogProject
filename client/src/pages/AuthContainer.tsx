import { Outlet } from "react-router-dom";
import React from "react";

const AuthContainer = () => {
  return (
    <div className="container w-screen grid place-items-center h-screen ">
      <Outlet />
    </div>
  );
};

export default AuthContainer;
