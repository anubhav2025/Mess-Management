import mongoose from "mongoose";

const studentMessManagerSchema = new mongoose.Schema(
	{
		messId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mess",
		},
		wardenId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Warden",
		},
		role: {
			type: String,
			default: "studentManager",
			immutable: true,
		},
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		regno: {
			type: String,
			required: true,
		},
		roomno: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		pendingRequestsFromDown: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Request",
		},
		// will both the request come from the same request model
		requestsForApproval: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Request",
		},
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
