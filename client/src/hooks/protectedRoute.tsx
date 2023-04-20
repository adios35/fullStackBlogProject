import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../pages/auth/user/currentUser";

const IsAuth = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return children;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

export default IsAuth;
