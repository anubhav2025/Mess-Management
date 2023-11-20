import mongoose from "mongoose";
import CollegeAdmin from "./users/collegeAdminModel.js";
import User from "./users/userModel.js";
import FoodItem from "./foodItemModel.js";

const complaintSchema = new mongoose.Schema(
	{
		collegeId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "CollegeAdmin",
		},
		madeById: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		itemAssociated: {
			type: Boolean,
			required: true,
		},
		itemId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "FoodItem",
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending Review", "In Progress", "Resolved", "Declined"],
		},
		comments: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Comment",
		},
		// upvote and downvote
	},
	{
		timestamps: true,
	}
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
