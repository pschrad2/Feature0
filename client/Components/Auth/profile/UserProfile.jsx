import React, { useEffect, useState } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Rating
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const query = new Parse.Query(Parse.User);
      try {
        const userObj = await query.get(userId);
        setUser(userObj);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <Box>
      {/* Background Header */}
      <Box
        sx={{
          height: 250,
          backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Profile Card */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: 800,
          margin: "-80px auto 0 auto",
          padding: 5,
          borderRadius: 5,
          position: "relative"
        }}
      >
        <Grid container spacing={3}>
          {/* Avatar */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Avatar
              alt="User Avatar"
              src="https://i.pravatar.cc/150?img=3"
              sx={{ width: 120, height: 120, margin: "auto" }}
            />
            <Typography variant="h6" sx={{ mt: 1 }}>
              {user.get("firstName")} {user.get("lastName")}
            </Typography>
            <Typography color="text.secondary">
              Advisor and Consultant
            </Typography>
            <Box mt={1}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                153 reviews
              </Typography>
            </Box>
          </Grid>

          {/* Info & Contact */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">Contact Information</Typography>
            <Typography>Email: {user.get("email")}</Typography>
            <Typography>Username: {user.get("username")}</Typography>
            <Typography>
              Joined: {user.createdAt?.toLocaleDateString()}
            </Typography>

            <Box mt={2} display="flex" gap={2}>
              <Button variant="contained" startIcon={<ChatIcon />}>
                Chat
              </Button>
              <Button variant="outlined" startIcon={<EmailIcon />}>
                Email
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Optional: Bottom Sections */}
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1">
          Placeholder for user intro video or description. Could embed a video
          here or provide background about the user.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
