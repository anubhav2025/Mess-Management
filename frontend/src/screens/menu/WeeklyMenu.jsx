import React, { useState } from "react";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	Rating,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useGetMenuItemsQuery } from "../../state/api";
import { timeNumToMeal } from "../../constants";

const MenuItem = ({
	_id,
	day,
	itemName,
	description,
	calories,
	rating,
	numReviews,
	time,
}) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	// const fCapitalDay = day[0].toUpperCase() + day.slice(1);
	const allCapitalDay = day.toUpperCase();

	return (
		<Card
			sx={{
				backgroundImage: "none",
				backgroundColor: theme.palette.background.alt,
				borderRadius: "0.55rem",
			}}
		>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{allCapitalDay}
				</Typography>
				<Typography
					variant="h6"
					component="div"
					fontSize="15px"
					color={theme.palette.secondary[500]}
				>
					{timeNumToMeal[time]}
				</Typography>
				<Typography
					variant="h5"
					component="div"
					fontSize="24px"
					fontWeight="600"
				>
					{itemName}
				</Typography>
				<Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[700]}>
					{calories} Calories
				</Typography>
				<Rating value={rating} readOnly />
				<Typography>({numReviews})</Typography>

				<Typography variant="body2">{description}</Typography>
			</CardContent>
			{/* <CardActions>
				<Button
					variant="primary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}
			>
				<CardContent>
					<Typography>{allCapitalDay}</Typography>
					<Typography>Supply Left: {supply}</Typography>
					<Typography>
						Yearly Sales This Year: {stat.yearlySalesTotal}
					</Typography>
					<Typography>
						Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
					</Typography>
				</CardContent>
			</Collapse> */}
		</Card>
	);
};

const MenuItems = () => {
	const theme = useTheme();
	const { userInfo } = useSelector((state) => state.auth);
	// console.log(userInfo);
	const { data, isLoading } = useGetMenuItemsQuery(userInfo.messId);
	console.log(!isLoading && data);
	const isNonMobile = useMediaQuery("(min-width: 1000px)");

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="MESS MENU"
				subtitle="Hungry? See what we have for you, today!"
			/>
			{data || !isLoading ? (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					justifyContent="space-between"
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
					}}
				>
					{data.map(
						({
							_id,
							itemName,
							description,
							calories,
							rating,
							day,
							time,
							numReviews,
						}) => (
							<MenuItem
								key={_id}
								_id={_id}
								itemName={itemName}
								description={description}
								calories={calories}
								rating={rating}
								day={day}
								time={time}
								numReviews={numReviews}
							/>
						)
					)}
				</Box>
			) : (
				<Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
					<p
						style={{
							color: `${theme.palette.secondary[500]}`,
						}}
					>
						LOADING...
					</p>
					<LinearProgress />
				</Box>
			)}
		</Box>
	);
};

export default MenuItems;
