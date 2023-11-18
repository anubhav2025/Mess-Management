import mongoose from "mongoose";

const storekeeperSchema = new mongoose.Schema(
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
		// will both the request come from the same request model
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

const Storekeeper = mongoose.model("Storekeeper", storekeeperSchema);
export default Storekeeper;
