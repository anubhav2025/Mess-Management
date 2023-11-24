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

//upvote
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
//downvote
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";

// import { useGetProductsQuery } from "../../state/api";
import { useGetFilteredComplaintsQuery } from "../../state/api";
import { useSelector } from "react-redux";

const Complaint = ({
  _id,
  title,
  description,
  status,
  upvotes,
  downvotes,
  comments,
  itemAssociated,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        {/* <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography> */}
        <Typography
          variant="h5"
          component="div"
          fontSize="20px"
          fontWeight="600"
        >
          {title}
        </Typography>
        {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography> */}
        {/* <Rating value={rating} readOnly /> */}
        <ArrowCircleUpTwoToneIcon /> {upvotes}
        <ArrowCircleDownTwoToneIcon /> {downvotes}
        <Typography variant="body2" fontSize="14px">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
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
          <Typography>id: {_id}</Typography>
          <Typography>Status: {status}</Typography>
          {/* <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography> */}
          {/* <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const TopVotedComplaints = () => {
  const theme = useTheme();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetFilteredComplaintsQuery(userInfo?.messId);
  console.log(data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COMPLAINTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(1, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          {data.map(
            ({
              _id,
              title,
              description,
              status,
              upvotes,
              downvotes,
              comments,
              itemAssociated,
            }) => (
              <Complaint
                key={_id}
                _id={_id}
                title={title}
                description={description}
                status={status}
                upvotes={upvotes}
                downvotes={downvotes}
                comments={comments}
                itemAssociated={itemAssociated}
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

export default TopVotedComplaints;
