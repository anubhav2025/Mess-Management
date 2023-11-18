import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "superAdmin",
			immutable: true,
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
		// isAdmin: {
		//   type: Boolean,
		//   required: true,
		//   default: false,
		// },
		pendingRequests: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Request",
		},
	},
	{
		timestamps: true,
	}
);

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
export default SuperAdmin;
