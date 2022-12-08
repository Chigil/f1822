import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import Photos from "../pages/Photos";
import User from "../pages/User";
import Login from "./Login";
import Context from "../context/context";

const AppRoutes = () => {
  const { isLogin, setIsLogin } = useContext(Context);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return setIsLogin(true);
    }
  }, []);

  return isLogin ? (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="*" element={<Users />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
