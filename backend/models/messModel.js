import mongoose from "mongoose";

const messSchema = new mongoose.Schema(
	{
		collegeAdminId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "College",
		},
		name: {
			type: String,
			required: true,
		},
		// warden changed to wardenId
		wardenId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Warden",
		},
		storekeeperId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Storekeeper",
		},
		accountantId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Accountant",
		},
		studentManagerId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Mess",
		},
		hostelName: {
			type: String,
			required: true,
		},
		menuId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Menu",
		},
	},
	{
		timestamps: true,
	}
);

const Mess = mongoose.model("Mess", messSchema);
export default Mess;
