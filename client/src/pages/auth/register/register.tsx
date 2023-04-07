import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface User {
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({} as User);

  const [error, setError] = React.useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) return;
    try {
      const response = axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });

      const res = await toast.promise(
        response,
        {
          loading: "Loading",
          success: (data) => `account created`,
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

      const result = await res.data.msg;
      setUser({ email: "", password: "" });
      setError("");
      navigate("/auth/login", { replace: true });
      // Store the token in local storage or in a state variable in your React component
    } catch (error) {
      // setError(error?.response?.data?.msg);
      console.log(error);
      setError(error.response.data.msg);

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
    <div className="Register max-w-sm shadow-md bg-slate-700 w-full rounded-md ">
      <h1 className="text-3xl text-center mt-5">Register</h1>
      <form action="" className="w-full p-5 flex flex-col items-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your email?</span>
          </label>
          <input
            value={user.email}
            name="email"
            onChange={handleInput}
            type="email"
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
        <button onClick={handleRegister} className="btn mt-5 btn-md">
          submit
        </button>
        <p className="text-sm">
          already have an acount?{" "}
          <Link className="text-blue-400 " to="/auth/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
