import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProtectedLink from "../Protected/ProtectedLink";
//import { checkUser } from "./AuthService";

const AuthModule = () => {

  return (
    <div>
      <ProtectedLink to="/auth/loggedin">
        <button>Accounts</button>
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