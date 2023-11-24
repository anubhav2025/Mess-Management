//prefix route '/api/mess/complaints'

import express from "express";
import {
	getFilteredComplaints,
	upvoteComplaint,
	downvoteComplaint,
	getComplaintVotes,
	createComplaint,
	updateComplaintStatus,
} from "../../controllers/mess/complaintsController.js";
import { allowedRoles } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/filter", allowedRoles("Student", "Accountant", "Warden", "SuperAdmin"), getFilteredComplaints);
router.post(
	"/create",
	allowedRoles("Student", "Accountant", "Warden"),
	createComplaint
);

//add more

export default router;
