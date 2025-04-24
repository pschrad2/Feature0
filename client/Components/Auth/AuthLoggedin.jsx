import React, { useState, useEffect } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import { getAllUsers, checkFollow, createFollow } from "../../Common/LearnServices";
import "../Auth/style/AuthLoggedin.css";
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const AuthLoggedin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usernameToFollow, setUsernameToFollow] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [emailToFollow, setEmailToFollow] = useState(""); // State for email input
  const [showConnectionInput, setShowConnectionInput] = useState(false); // State to control showing input fields

  // Sign out the user
  const handleSignOut = () => {
    Parse.User.logOut().then(() => {
      alert("You have been logged out.");
      navigate("/auth/login");
    }).catch((error) => {
      alert("Error logging out: " + error.message);
    });
  };

  // Fetch all users
  const handleFetchUsers = () => {
    getAllUsers().then((results) => {
      setUsers(results);
    });
  };

  // Create follow relationship by email
  const handlecreateFollowingByEmail = async () => {
    const currentUser = Parse.User.current();
    const otherUser = users.find((user) => {
      // Get the email of the current user
      const userEmail = user.get("username");
      console.log("User email: ", userEmail);
      // Convert both the stored email and the input email to lowercase
      const isEmailMatch = userEmail.toLowerCase() === emailToFollow.toLowerCase();
    
      // Return true if the email matches, so that 'find()' can return this user
      return isEmailMatch;
    });
    console.log("Current user: ", currentUser);
    console.log("Other user: ", otherUser);
    console.log("Email to follow: ", emailToFollow);
    if (otherUser) {
      try {
        await createFollow(currentUser, otherUser);
        alert(`You are now following ${otherUser.get("firstName")} ${otherUser.get("lastName")}`);
        setEmailToFollow(""); // Clear input after following
        setShowConnectionInput(false); // Hide the input fields after follow
      } catch (error) {
        console.error("Error following user:", error);
      }
    } else {
      alert("User not found with that email.");
    }
  };

  // Fetch followed users
  const handleFetchFollowing = async () => {
    const currentUser = Parse.User.current();
    const followingList = [];
    for (const user of users) {
      if (user.id !== currentUser.id) {
        const isFollowing = await checkFollow(currentUser, user);
        if (isFollowing) {
          followingList.push(user);
        }
      }
    }
    setFollowedUsers(followingList);
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome</h1>
        <p className="intro-text">Click here to get all other mentor information.</p>
      </header>

      <main className="main-content">
        <button onClick={handleFetchUsers}>Get All Users</button>
        <button onClick={handleFetchFollowing}>View all Follows</button>

        {/* Display users */}
        {users.length > 0 && (
          <div>
            <Typography variant="h6">Users:</Typography>
            {users.map((user) => (
              <Typography key={user.id}>{user.get("username")}</Typography>
            ))}
          </div>
        )}

        {/* Button to show email input for following */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowConnectionInput(!showConnectionInput)}
        >
          Make a connection
        </Button>

        {/* Conditionally render email input and follow button */}
        {showConnectionInput && (
          <div>
            <TextField
              label="Enter Email to Follow"
              variant="outlined"
              value={emailToFollow}
              onChange={(e) => {
                setEmailToFollow(e.target.value),
                console.log("Current emailToFollow value: ", e.target.value); 

              }}
              sx={{ marginTop: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handlecreateFollowingByEmail}
              sx={{ marginTop: 2 }}
            >
              Follow
            </Button>
          </div>
        )}

        {/* Display followed users */}
        <section className="section">
          <h2>Your connections:</h2>
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
