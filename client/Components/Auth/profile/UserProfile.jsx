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
  Rating,
  TextField
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [documentation, setDocumentation] = useState("");

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

  const handleDocumentationChange = (event) => {
    setDocumentation(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Background Header with Overlay */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)"
          }}
        />
      </Box>

      {/* Profile Card */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          margin: "-100px auto 0 auto",
          padding: 4,
          borderRadius: 8,
          position: "relative",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white"
        }}
      >
        <Grid container spacing={4}>
          {/* Avatar */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Avatar
              alt="User Avatar"
              src="https://i.pravatar.cc/150?img=3"
              sx={{
                width: 140,
                height: 140,
                margin: "auto",
                border: "3px solid #fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
              }}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
              {user.get("firstName")} {user.get("lastName")}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
            {user.get("Occupation") || "Occupation not set"}
            </Typography>
            <Box mt={2}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                153 reviews
              </Typography>
            </Box>
          </Grid>

          {/* Info & Contact */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contact Information
            </Typography>
            <Typography>Email: {user.get("email")}</Typography>
            <Typography>Username: {user.get("username")}</Typography>
            <Typography>
              Joined: {user.createdAt?.toLocaleDateString()}
            </Typography>

            <Box mt={3} display="flex" gap={3}>
              <Button variant="contained" color="primary" startIcon={<ChatIcon />} sx={{ minWidth: "120px" }}>
                Chat
              </Button>
              <Button variant="outlined" color="primary" startIcon={<EmailIcon />} sx={{ minWidth: "120px" }}>
                Email
              </Button>
            </Box>

            {/* Google Meet Link */}
            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Join Google Meet
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href="https://meet.google.com/"
                target="_blank"
                sx={{ marginTop: "1rem" }}
              >
                Join Meeting
              </Button>
            </Box>

            {/* Google Form Link */}
            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Fill Out Google Form
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfyFmwwHfseoPqffn9TtAPX4XAI-W9weFAan3U4wlnM_qOcoA/viewform?usp=dialog"
                target="_blank"
                sx={{ marginTop: "1rem" }}
              >
                Open Form
              </Button>
            </Box>

            {/* Documentation */}
            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Documentation
              </Typography>
              <TextField
                label="Enter your notes"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={documentation}
                onChange={handleDocumentationChange}
                sx={{ marginTop: "1rem" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Optional: Bottom Sections */}
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, paddingX: 2 }}>
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
