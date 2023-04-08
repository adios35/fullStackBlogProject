import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const TOKEN_API_URL = "http://localhost:3000/token";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<null | any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TOKEN_API_URL);
        const token = response.data.accessToken;
        setToken(token);
        const decoded = await jwt_decode(token);
        setIsAuthenticated(decoded);
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(TOKEN_API_URL);
        const token = response.data.accessToken;
        setToken(token);
        const decoded = await jwt_decode(token);
        setIsAuthenticated(decoded);
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    }, 14 * 60 * 1000); // Refresh token every 14 minutes
    return () => clearInterval(intervalId);
  }, []);

  return { token, isAuthenticated, isLogin, setIsLogin, setToken };
};

export default useAuth;
