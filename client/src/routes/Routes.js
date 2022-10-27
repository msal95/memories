import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import PostDetails from "../screens/PostDetails";

const MainRoutes = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/posts" />} />
      <Route path="/posts" element={<HomeScreen />} />
      <Route path="/posts/search" element={<HomeScreen />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route
        path="/auth"
        element={!user ? <AuthScreen /> : <Navigate to="/posts" />}
      />
    </Routes>
  );
};

export default MainRoutes;
