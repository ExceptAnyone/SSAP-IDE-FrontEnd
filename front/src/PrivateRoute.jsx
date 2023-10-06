import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getCookie } from "./cookie/cookieUtils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getCookie("token");

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
