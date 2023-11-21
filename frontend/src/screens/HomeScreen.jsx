import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

const HomeScreen = () => {
   const { userInfo } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
      try {
         await logoutApiCall().unwrap();
         dispatch(removeCredentials());
         navigate("/");
         toast.info("Logged out successfully", { autoClose: 1000 });
      }
      catch (err) {
         console.log(err);
         toast.error(err?.data?.message || err.error);
      }
   };

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

         {userInfo ? (
            <>
               <Typography component="h1" variant="h2" sx={{ mb: 3, color: 'yellow' }}>
                  Welcome!
               </Typography>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                     mt: 3,
                     mb: 2,
                     width: '12%'
                  }}
                  onClick={logoutHandler}
               >
                  Logout
               </Button>
               <Link to="/dashboard/student" style={{ textDecoration: 'none', width: '12%' }}>
                  <Button
                     fullWidth
                     variant="contained"
                     sx={{
                        mt: 3,
                        mb: 2,
                     }}
                  >
                     Dashboard
                  </Button>
               </Link>
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
