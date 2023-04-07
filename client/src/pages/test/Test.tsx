import React from "react";
import useAuth from "../../hooks/useAuth";

const Test = () => {
  const { token, isAuthenticated } = useAuth();
  console.log(token, isAuthenticated);

  return <div>test</div>;
};

export default Test;
