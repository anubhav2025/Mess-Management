import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		regno: {
			type: String,
			required: true,
		},
		roomno: {
			type: String,
			required: true,
		},
		complaintsLast30Days: [
			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
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
			// default: 9 / 99 / 999,
		},
		idExpiresAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
