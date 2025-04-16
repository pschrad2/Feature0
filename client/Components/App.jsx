import React, { useEffect } from "react";
import { useState } from 'react'
//import * as Env from "./environments";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import AuthModule from "../Components/Auth/Auth.jsx";
import AuthRegister from "../Components/Auth/AuthRegister.jsx";
import AuthLogin from "../Components/Auth/AuthLogin.jsx";
import AuthLoggedin from "../Components/Auth/AuthLoggedin.jsx";
import ProtectedRoute from "../Components/Protected/ProtectedRoute.jsx";
import UserProfile from "../Components/Auth/profile/UserProfile.jsx";
import "../Components/CompStyle.css"
import ProtectedLink from "./Protected/ProtectedLink";
import Layout from "./Layout/Layout.jsx";
/*import MainList from "../Components/Main/MainList.jsx";
*/


export default function Components() {

  const [users, setUsers] = useState([]);
  
    
  return (
    <Router>
      
      <div className="page-container">
    <h1>Hello!!</h1>
    <img
      className="logo"
      src="https://pigment.github.io/fake-logos/logos/large/color/fast-banana.png"
      alt="logo"
      width="300"
    />
    
    

        <Routes>
        <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin/>}/>
          <Route
            path="/auth/loggedin"
             element={
              <ProtectedRoute> 
              <AuthLoggedin />
              </ProtectedRoute>
            }
             />
          
          <Route path="/profile/:userId" element={<UserProfile />} />

          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
        </div>
    </Router>
  );
}