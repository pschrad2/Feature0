import React from "react";
import { useState } from 'react';
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import {getAllUsers, checkFollow} from "../../Common/LearnServices"

const AuthLoggedin = ({ user, isLogin, onChange, onSubmit }) => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);

   // Sign out the user
   const handleSignOut = () => {
    Parse.User.logOut().then(() => {
      // After logout, navigate to the login page
      alert("You have been logged out.");
      navigate("/auth/login");
    }).catch((error) => {
      alert("Error logging out: " + error.message);
    });
  };

  // Handle button click for Get All Users
    /*const handleFetchUsers = () => {
      getAllUsers().then((results) => {
        console.log(" Users:", results);
        setUsers(results); // store in state to display
        
        /////////////Testing for table relationships
        const User = Parse.Object.extend("_User");
        const thisUser = User[0];
        const otherUser =  User[1]// another PFUser object

        const isFollowing = await checkFollow(currentUser, otherUser);

if (isFollowing) {
  console.log('You are already following this user.');
} else {
  console.log('You are not following this user yet.');
}
        
      });
  };*/
  const handleFetchUsers = async () => {
    try {
      const results = await getAllUsers();
      console.log("Users:", results);
      setUsers(results); // Save users in state
  
      // Ensure there are at least 2 users
      if (results.length >= 2) {
        const currentUser = results[0]; // Example: the first user
        const otherUser = results[1];   // Example: the second user
        console.log(results[0])
        const isFollowing = await checkFollow(currentUser, otherUser);
  
        if (isFollowing) {
          console.log('You are already following this user.');
        } else {
          console.log('You are not following this user yet.');
        }
      }
    } catch (error) {
      console.error("Error fetching users or checking follow:", error);
    }
  };
  
  
  const currentUser = Parse.User.current();
  return (
    <div className="container">
      <header className="header">
      <h1>Welcome </h1>
        <p className="intro-text"> click here to get all other mentor information. We can add signing in as a mentor or mentee here and have mentors able to see only their mentees information</p>
      </header>
      
      <main className="main-content">
      <button onClick={handleFetchUsers}>Get All Users</button>
      {/* Display the users if available */}
      {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.get("username")}</li>
            ))}
          </ul>
        )}

        <section className="section">
          <h2>Your mentee schedule:</h2>
          <p>
            You do not have any mentees yet because this app is not fully working. This could be a dynamic link to a calendar with scheduled zoom calls or job requirements.
          </p>
        </section>

        <section className="section">
          <h2>Other role openings:</h2>
          <ul>
            <li>Maybe a scrolling list here of jobs that mentors could do for mentees</li>
            <li>Coaching clinics</li>
            <li>Film review</li>
            <li>Private lesson</li>
            <li>Weight room with a player</li>
            <li>Tours</li>
          </ul>
        </section>

         {/* Sign Out Button */}
         <section className="section">
          <button onClick={handleSignOut}>Sign Out</button>
        </section>
      </main>

      <footer className="footer">
        <p>Contact pschrad2@nd.edu for help</p>
      </footer>
    </div>

  );
};

export default AuthLoggedin;