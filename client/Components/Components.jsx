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
/*import MainList from "../Components/Main/MainList.jsx";
*/


export default function Components() {

  const [users, setUsers] = useState([]);
  
    
  return (
    <Router>
      <div>
        <h1>Hello!!</h1>
        <img
          src="https://pigment.github.io/fake-logos/logos/large/color/fast-banana.png"
          alt="Description of the image"
          width="300"
        />
        

        <Routes>
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin/>}/>
          <Route
            path="/auth/loggedin"
            element={<ProtectedRoute element={AuthLoggedin} />}
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Router>
  );

 
  }