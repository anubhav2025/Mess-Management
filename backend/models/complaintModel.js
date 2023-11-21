import mongoose from "mongoose";
import CollegeAdmin from "./users/collegeAdminModel.js";
import User from "./users/userModel.js";
import FoodItem from "./foodItemModel.js";
import Comment from "./commentModel.js";

const complaintSchema = new mongoose.Schema(
	{
		collegeAdminId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "CollegeAdmin",
		},
		messId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mess",
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
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "Comment",
			},
		],
		upvotes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		downvotes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
