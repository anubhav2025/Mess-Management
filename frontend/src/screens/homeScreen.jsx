import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
   const { userInfo } = useSelector((state) => state.auth);

   const containerStyle = {
      backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
   };

   return (
      <div style={containerStyle}>
         <Typography component="h1" variant="h2" sx={{ mb: 3, color: 'white' }}>
            Mess Manager
         </Typography>

         {userInfo ? (
            <>
               <Typography component="h1" variant="h2" sx={{ mb: 3, color: 'yellow' }}>
                  Welcome!
               </Typography>
            </>
         ) : (
            <div>
               <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                     Sign In
                  </Button>
               </Link>
               <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary" size="large">
                     Sign Up
                  </Button>
               </Link>
            </div>
         )}
      </div>
   );
};

export default HomeScreen;
