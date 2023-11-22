import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; //this allows us to have the template layouts.
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar";
// import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userInfo = useSelector((state) => state.auth.userInfo);
  //   console.log(userInfo);
  const userId = userInfo._id;
  //   const { data } = useGetUserQuery(userId);
  const data = {};

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}} //coz when it is loading you get undefined. so you send an empty object instead.
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        {" "}
        {/* flexGrow = 1 lets it take as much space as it could.*/}
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
