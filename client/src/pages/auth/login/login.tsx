import React from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useUser } from "../user/currentUser";
axios.defaults.withCredentials = true;
interface User {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setUser: setCurrentUser } = useUser();
  const [user, setUser] = React.useState({} as User);
  const [error, setError] = React.useState("");
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) return setError("input tidak boleh kosong");
    try {
      const response = axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const res = await toast.promise(
        response,
        {
          loading: "Loading",
          success: (data) => `you're logged in`,
          error: (err) => `${err.response.data.msg}`,
        },
        {
          style: {
            minWidth: "250px",
            background: "#191D24",
            color: "white",
          },
          success: {
            duration: 1000,
            // icon: "👍",
          },
        }
      );

      setCurrentUser(res.data.user);
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const token = await res.data.accessToken;
      // console.log(token);
      setUser({ email: "", password: "" });
      setError("");
      // Store the token in local storage or in a state variable in your React component
      // setToken(token);
      // toast("you're logged i;
      navigate("/", { replace: true });
    } catch (error) {
      setError(error?.response?.data?.msg);
      // Handle any errors
    }
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  }
  return (
    <div className="login max-w-sm shadow-md  w-full rounded-md ">
      <h1 className="text-3xl text-center mt-5">Login</h1>

      <form action="" className="w-full p-5 flex flex-col items-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your email?</span>
          </label>
          <input
            value={user.email}
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter your Password?</span>
          </label>
          <input
            value={user.password}
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-"
          />
        </div>
        {/* error */}
        {error && (
          <div className="alert h-10 mt-5 max-w-xs alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        <button
          onClick={handleLogin}
          className="btn mt-5 btn-success text-white btn-md"
        >
          Login
        </button>
        <p className="text-sm">
          don't have an account?{" "}
          <Link className="text-blue-400 " to="/auth/register">
            Regsiter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
