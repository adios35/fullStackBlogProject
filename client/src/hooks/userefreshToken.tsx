import axios from "axios";
import React from "react";

const useRefreshToken = () => {
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    // effect code
    const token = axios.get("http://localhost/token");
    console.log(token);
    return () => {
      // cleanup code
    };
  }, []);

  return token;
};

export default useRefreshToken;
