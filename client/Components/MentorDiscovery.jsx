import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { getAllUsers } from '../Common/LearnServices';

export default function MentorDiscovery() {
  const [users, setUsers] = useState([]);

  const handleFetchUsers = () => {
    getAllUsers().then((results) => {
      setUsers(results);
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFetchUsers}>
        Get All Users
      </Button>

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Mentor Discovery</Typography>

        {users.length > 0 ? (
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {user.get('firstName')} {user.get('lastName')}
                    </Typography>
                    <Typography variant="body2">
                      {user.get('occupation') || 'No title available'}
                    </Typography>
                    {user.get('linkedin') && (
                      <Typography variant="body2" color="primary">
                        <a href={user.get('linkedin')} target="_blank" rel="noopener noreferrer">
                          LinkedIn Profile
                        </a>
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No users loaded. Click "Get All Users" to fetch them.
          </Typography>
        )}
      </Container>
    </div>
  );
}
