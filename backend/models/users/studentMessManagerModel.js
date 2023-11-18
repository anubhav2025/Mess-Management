import mongoose from "mongoose";

const studentMessManagerSchema = new mongoose.Schema(
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
		regno: {
			type: String,
			required: true,
		},
		roomno: {
			type: String,
			required: true,
		},
		pendingRequestsFromDown: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Request",
			},
		],
		// will both the request come from the same request model
		requestsForApproval: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Request",
			},
		],
	},
	{
		timestamps: true,
	}
);

const StudentMessManager = mongoose.model(
	"StudentMessManager",
	studentMessManagerSchema
);
export default StudentMessManager;
