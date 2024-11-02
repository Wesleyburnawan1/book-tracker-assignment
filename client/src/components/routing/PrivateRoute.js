import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  } else return <Home />;
};

export default PrivateRoute;
