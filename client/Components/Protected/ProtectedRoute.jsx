import React from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

// ProtectedRoute will check if the user is authenticated
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  if (checkUser()) {
    // If the user is authenticated, render the requested component
    return (<Component {...rest} />);
  } else {
    // If the user is not authenticated, redirect to the login page
    return (
      <div>
        <p>Unauthorized! You need to log in to view this page.</p>
        <button onClick={() => navigate("/auth/login")}>Go to Login</button>
      </div>
    );
  }
};

export default ProtectedRoute;

