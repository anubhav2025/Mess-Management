import asyncHandler from "../../middleware/asyncHandler.js";

const getPendingRequests = asyncHandler(async (req, res) => {
	console.log("GET PENDING REQUESTS CALLED.");
	res.status(200);
});

export { getPendingRequests };
