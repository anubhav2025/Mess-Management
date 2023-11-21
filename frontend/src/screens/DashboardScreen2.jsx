import React from 'react';
import { Typography } from '@mui/material';

const Dashboard2 = () => {
  const containerStyle = {
    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: '20px',
  };

  return (
    <div style={containerStyle}>
      <Typography component="h1" variant="h2" sx={{ mb: 3, color: 'white' }}>
        Mess Master
      </Typography>

      <>
        <Typography component="h1" variant="h2" sx={{ mb: 3, color: 'yellow' }}>
          Dashboard
        </Typography>
      </>
    </div>
  );
};

export default Dashboard2;
