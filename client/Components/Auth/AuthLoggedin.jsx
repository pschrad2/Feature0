import React from "react";
import { useState, useEffect } from 'react';
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import {getAllUsers, checkFollow, createFollow} from "../../Common/LearnServices"
import "../Auth/style/AuthLoggedin.css"
import { Card, CardContent, Typography, Button } from '@mui/material';



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
    const handleFetchUsers = () => {
      getAllUsers().then((results) => {
        console.log(" Users:", results);
        setUsers(results); // store in state to display
        
      });
  };
  /*const handleFetchUsers = async () => {
    try {
      const results = await getAllUsers();
      console.log("Users:", results);
      setUsers(results); // Save users in state
  
      // Ensure there are at least 2 users
      if (results.length >= 2) {
        const currentUser = results[0]; 
        const otherUser = results[1];   
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
  };*/

  const handlecreateFollowing = async() => {
    try{
      const results = await getAllUsers();
      //console.log("Users:", results);
      setUsers(results);
      const currentUser = Parse.User.current()  // Assuming the first user is the current user 
      const otherUser = results[3];   
      await createFollow(currentUser, otherUser);
    } catch (error) {
      console.error("Error fetching users or checking follow:", error);
    }
  };
  const [followedUsers, setFollowedUsers] = useState([]);

const handleFetchFollowing = async () => {
  try {
    const results = await getAllUsers();
    setUsers(results); // Save all users to state

    const currentUser = Parse.User.current() 
    const followingList = [];

    for (const user of results) {
      if (user.id !== currentUser.id) {
        const isFollowing = await checkFollow(currentUser, user);
        if (isFollowing) {
          followingList.push(user);
          console.log(followingList);
        }
      }
    }

    setFollowedUsers(followingList);
    console.log("Users you follow:", followingList);
  } catch (error) {
    console.error("Error fetching users or checking follow:", error);
  }
};

useEffect(() => {
  const fetchUsers = async () => {
    const users = await getAllUsers();
    console.log("All users:", users.map(u => u.get("username")));
  };
  fetchUsers();
}, []);

  //const currentUser = Parse.User.current();
  return (
    <div className="container">
      <header className="header">
      <h1>Welcome </h1>
        <p className="intro-text"> click here to get all other mentor information. We can add signing in as a mentor or mentee here and have mentors able to see only their mentees information</p>
      </header>
      
      <main className="main-content">
      <button onClick={handleFetchUsers}>Get All Users</button>
      <button onClick={handlecreateFollowing}>Follow</button>
      <button onClick={handleFetchFollowing}>View all Follows</button>
      {/* Display the users if available */}
      {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.get("username")}</li>
            ))}
          </ul>
        )}
        {/* Display followed users */}
        
      {followedUsers.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {followedUsers.map((user) => (
          <Card key={user.id} sx={{ minWidth: 275, maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {user.get("firstName")} {user.get("lastName")}
              </Typography>
              <Typography color="text.secondary">
                Username: {user.get("username")}
              </Typography>
              <Typography color="text.secondary">
                Email: {user.get("email")}
              </Typography>
              <Button
                size="small"
                onClick={() => navigate(`/profile/${user.id}`)}
                sx={{ marginTop: 1 }}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
        </div>
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