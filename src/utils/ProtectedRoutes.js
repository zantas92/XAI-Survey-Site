import React from "react";
import { Outlet } from 'react-router-dom';
import Login from '../pages/auth/Login';
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.value);
  return user ? <Outlet /> : <Login/>;
}

export default ProtectedRoute;