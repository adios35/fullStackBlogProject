import React from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface user {
  email: string;
  exp: number;
  iat: number;
  id: string;
}

const Dashboard = () => {
  const [user, setUser] = React.useState({} as user);
  const [expired, setExpired] = React.useState<any>();

  const [token, setToken] = React.useState<any>("");
  const navigate = useNavigate();

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (user.exp * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:3000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const user: user = await jwt_decode(token);
        setUser(user);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  async function getUser() {
    const res = await axiosJWT
      .get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        navigate("/auth/login");
      });
    const user: user = await jwt_decode(token);
    setUser(user);
    // const user = await jwt_decode(res);
    console.log(user);
  }

  async function refreshToken() {
    try {
      const res = await axios.get("http://localhost:3000/token");
      setToken(res.data.accessToken);
      // const decode
    } catch (err) {
      if (err) navigate("/auth/login");
      console.log(err);
    }
  }
  React.useEffect(() => {
    // effect code
    refreshToken();
    return () => {
      // cleanup code
    };
  }, []);

  async function logOut() {
    await axios.delete("http://localhost:3000/auth/logout").then(() => {
      navigate("/auth/login");
    });
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 shadow-md rounded-md">
        <button onClick={getUser} className="btn">
          getToken
        </button>
        <button onClick={logOut} className="btn">
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
