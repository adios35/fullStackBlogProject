import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import AuthContainer from "./pages/AuthContainer";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/home";
import Test from "./pages/test/Test";
import NavBar from "./components/navbar/NavBar";
import Post from "./pages/singlePost/Post";
import CurrentUserProvider from "./pages/auth/user/currentUser";

const App = () => {
  return (
    <CurrentUserProvider>
      <div className="pt-20 ">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/test" element={<Test />} />
          <Route path="/auth" element={<AuthContainer />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </CurrentUserProvider>
  );
};

export default App;
