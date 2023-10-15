import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import userApi from "../api/user";

const checkValidToken = async token => {
  return userApi.verifyToken(token);
}

export const ProtectedRoute = ({ children, type = "user" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login"/>;
  } else {
    if (type === "admin" && user.type !== "admin") {
      return <Navigate to="/"/>;
    } else {
      checkValidToken(user.token).then(isValid => {
        if (!isValid) {
          navigate("/login", { replace: true })
        }
      })
    }
  }
  return children;
};
