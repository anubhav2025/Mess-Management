import mongoose from "mongoose";
import Mess from "../messModel.js";
import College from "./collegeAdminModel.js";
import Request from "../requestModel.js";

const wardenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		pendingRequestsFromDown: [
			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "Request",
			},
		],
		requestsSentForApproval: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Request",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Warden = mongoose.model("Warden", wardenSchema);
export default Warden;
