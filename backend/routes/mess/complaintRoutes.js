//prefix route '/api/mess/complaints'

import express from "express";
import {
  getFilteredComplaints,
  upvoteComplaint,
  downvoteComplaint,
  getComplaintVotes,
  createComplaint,
  updateComplaintStatus,
  getLatestComplaints,
} from "../../controllers/mess/complaintsController.js";
import { allowedRoles } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/filter", getFilteredComplaints);
router.get("/latest/:messId", getLatestComplaints);
router.post(
  "/create",
  allowedRoles("Student", "Accountant", "Warden"),
  createComplaint
);

//add more

export default router;
