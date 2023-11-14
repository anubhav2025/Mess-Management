import mongoose from "mongoose";
import Warden from "./models/wardenModel.js";
import Storekeeper from "./models/storeKeeperModel.js";
import Accountant from "./models/accountantModel.js";
import Student from "./models/studentModel.js";
import SuperAdmin from "./models/superAdminModel.js";
import StudentMessManager from "./models/studentMessManagerModel.js";
import { roleModelMap } from "../../constants.js";
const userSchema = new mongoose.Schema(
	{
		role: {
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
		image: {
			type: String,
			required: true,
		},
		messId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Mess",
		},
		collegeAdminId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CollegeAdmin",
		},

		roleSpecificData: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "role",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPasseword) {
	return await bcrypt.compare(enteredPasseword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
