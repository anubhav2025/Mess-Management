import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'   //this allows us to have the template layouts.
import { useSelector } from 'react-redux'
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from '../../state/api';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {userInfo ? (
        <>
          <Sidebar
            user={data || {}}   //coz when it is loading you get undefined. so you send an empty object instead.
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box flexGrow={1}>    {/* flexGrow = 1 lets it take as much space as it could.*/}
            <Navbar
              user={data || {}}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
          </Box>
        </>
      ) : (
        <Outlet />
      )}

    </Box>
  );
}

export default Layout