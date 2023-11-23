import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const HomeScreen = () => {
   const { userInfo } = useSelector((state) => state.auth);

   return (
      <div>
         {userInfo ? (
            <Navigate to="/dashboard" />
         ) : (
            <Navigate to="/login" />
         )}
      </div>
   );
};

export default HomeScreen;
