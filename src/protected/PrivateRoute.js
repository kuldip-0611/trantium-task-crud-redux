import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Login from "../pages/Login";

const PrivateRoute = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  return data !== null ? <Outlet /> : <Login />;
};

export default PrivateRoute;
