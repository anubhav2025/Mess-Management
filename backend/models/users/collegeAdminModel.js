import mongoose from "mongoose";

const collegeAdminSchema = new mongoose.Schema(
	{
		collegeName: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "collegeAdmin",
		},

		designation: {
			// what is this?
			type: String,
			required: true,
		},
		phone: {
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
		messes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Mess",
			},
		],
	},
	{
		timestamps: true,
	}
);

collegeAdminSchema.methods.matchPassword = async function (enteredPasseword) {
	return await bcrypt.compare(enteredPasseword, this.password);
};

// Encrypt password using bcrypt
collegeAdminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const CollegeAdmin = mongoose.model("CollegeAdmin", collegeAdminSchema);
export default CollegeAdmin;
