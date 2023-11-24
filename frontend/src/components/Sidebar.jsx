import React from "react";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";

//icons
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
} from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PollIcon from "@mui/icons-material/Poll";
import TaskIcon from "@mui/icons-material/Task";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/profile.jpg";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const navItems = [
	{
		text: "Dashboard",
		icon: <HomeOutlined />,
	},
	{
		text: "Menu",
		icon: null,
	},
	{
		text: "Weekly Menu",
		icon: <MenuBookIcon />,
	},
	{
		text: "Items & Reviews",
		icon: <ReviewsIcon />,
	},
	{
		text: "Complaints",
		icon: null,
	},
	{
		text: "Add a Complaint",
		icon: <AddCircleIcon />,
	},
	{
		text: "Latest",
		icon: <TaskIcon />,
	},
	{
		text: "Top Voted",
		icon: <PollIcon />,
	},
];

const Sidebar = ({
	user,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const [active, setActive] = useState(""); //what page we are currently at.
	const navigate = useNavigate();
	const theme = useTheme();

	const { userInfo } = useSelector((state) => state.auth);

	const role = userInfo ? userInfo.fname : "";

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						"& .MuiDrawer-paper": {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							// boxSixing: "border-box",
							borderWidth: isNonMobile ? 0 : "2px",
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						{/* box for the logo START */}
						<Box m="1.5rem 2rem 2rem 3rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display="flex" alignItems="center" gap="0.5rem">
									<Typography variant="h4" fontWeight="bold">
										Mess Master
									</Typography>
								</Box>
								{/* if mobile, display a close button */}
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						{/* box for the logo END */}
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: "1.75rem 0 0.75rem 3rem" }}>
											{text}
										</Typography>
									);
								}
								const lcText = text.toLowerCase();

								return (
									<ListItem key={text} disablePadding>
										{" "}
										{/* removing disablePadding also gives it a nice distinctive look */}
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: "transparent",
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: "1.8rem",
													color:
														active === lcText
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lcText && (
												<ChevronRightOutlined sx={{ ml: "auto" }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box marginBottom="1.5rem" bottom="2px">
						<Divider />
						<FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{userInfo.fname}
								</Typography>
								<Typography
									fontSize="0.8rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{userInfo.role}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[300],
									fontSize: "25px ",
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
