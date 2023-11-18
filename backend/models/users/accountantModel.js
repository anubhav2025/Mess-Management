import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		wardenId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Warden",
		},
		pendingRequestsFromDown: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Request",
			},
		],
		// will both the request come from same request model
		requestsForApproval: [
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

const Accountant = mongoose.model("Accountant", accountantSchema);
export default Accountant;
