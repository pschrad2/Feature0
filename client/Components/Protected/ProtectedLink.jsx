import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService"; 

const ProtectedLink = ({ to, children }) => {
  const navigate = useNavigate();

  // If the user is not authenticated, prevent them from accessing the link
  if (!checkUser()) {
    // Optionally, you can navigate to login page or show a message
    return (
      <div>
        <p>You need to log in to access this page.</p>
        <button onClick={() => navigate("/auth/login")}>Go to Login</button>
      </div>
    );
  }

  // If the user is authenticated, show the link
  return <Link to={to}>{children}</Link>;
};

export default ProtectedLink;
