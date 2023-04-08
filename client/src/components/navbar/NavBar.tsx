import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useUser } from "../../pages/auth/user/currentUser";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  //this usestate for rerendering the components

  async function logOut() {
    await axios.delete("http://localhost:3000/auth/logout").then(() => {
      navigate("/auth/login");
      setUser(null);
    });
  }

  return (
    <div className="p-[2px]  items-center h-14 w-full fixed top-0 bg-white justify-between px-5 flex  shadow-md">
      <Link to="/">blogapp</Link>
      <div className={`right`}>
        <div className="photo group h-11 w-11 cursor-pointer relative rounded-full   m-2 shadow-md bg-gray-400 border-2 ">
          <div className="info hidden  backdrop-blur-xl bg-opacity-10 -translate-x-[50%] shadow-md   rounded-md p-6 [&>*]:cursor-pointer space-y-3 absolute bg-gray-200 top-10  left-2/4   group-hover:block">
            {user ? (
              <button onClick={logOut}>Logout</button>
            ) : (
              <button onClick={() => navigate("/auth/login")}>login</button>
            )}
            <p>{user && user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
