import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../protected/PrivateRoute";
import Home from "../pages/Home";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route  path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PrivateRoutes;
