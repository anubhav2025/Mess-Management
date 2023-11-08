import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
	{
		messId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mess",
		},
		role: {
			type: String,
			default: "student",
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
		complaintsLast30Days: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Complaint",
			},
		],
		// caloriesTaken
		blockStatus: {
			type: Boolean,
			default: false,
		},
		blockedTill: {
			type: Date,
		},
		// idExpiresAt: {
		//   type: Date,
		// },
	},
	{
		timestamps: true,
	}
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
