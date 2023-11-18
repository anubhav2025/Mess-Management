import mongoose from "mongoose";
import Mess from "../messModel.js";
import College from "./collegeAdminModel.js";

const wardenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		pendingRequests: [
			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
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
