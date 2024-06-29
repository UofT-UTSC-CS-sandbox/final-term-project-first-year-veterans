// src/HomePage.js
import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import DailyPlanCard from './DailyCalendarCard';
const newsItems = [
  { id: 1, title: 'New Feature Released', description: 'We have released a new feature that allows you to...' },
  { id: 2, title: 'Update on Privacy Policy', description: 'Our privacy policy has been updated to reflect...' },
  { id: 3, title: 'Upcoming Maintenance', description: 'Scheduled maintenance will occur on...' },
];

const HomePage = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Home Page!
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '30px' }}>
        What's New
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {newsItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DailyPlanCard/>
    </Container>
  );
};

export default HomePage;
