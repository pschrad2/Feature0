import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProtectedLink from "../Protected/ProtectedLink";
//import { checkUser } from "./AuthService";

const AuthModule = () => {

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "flex-end", 
      gap: "1rem", 
      padding: "1rem", 
      backgroundColor: "#f8f8f8", 
      borderBottom: "1px solid #ddd" 
    }}>
      <ProtectedLink to="/auth/loggedin">
        <button>Account</button>
      </ProtectedLink>
      <br/>
      <br/>
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;