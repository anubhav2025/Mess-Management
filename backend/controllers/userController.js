import asyncHandler from "../middleware/asyncHandler.js";
import { roleModelMap, nonAdminRoles } from "../constants.js";
import User from "../models/users/userModel.js";
import CollegeAdmin from "../models/users/collegeAdminModel.js";
import Mess from "../models/messModel.js";
import Student from "../models/users/studentModel.js";

// always use role in all camelCasing.

// except collegeAdmin and superAdmin

const createNonAdminUser = asyncHandler(async (req, res) => {
	try {
		const {
			role,
			fname,
			lname,
			phone,
			email,
			password,
			image,
			messId,
			collegeAdminId,
			regNo,
			roomNo,
		} = req.body;

		const collegeExists = await CollegeAdmin.exists({ _id: messId });
		const messExists = await Mess.exists({ _id: messId });

		if (!messExists || !collegeExists || !nonAdminRoles.includes(role)) {
			return res.status(400).json({ message: "Invalid Details" });
		}

		const user = new User({
			role,
			fname,
			lname,
			phone,
			email,
			password,
			image,
			messId,
			collegeAdminId,
		});

		await user.save();
		const RoleModel = roleModelMap[role];
		let roleSpecificData;
		if (user.role === "Student") {
			roleSpecificData = new Student({
				userId: user._id,
				regno: regNo,
				roomno: roomNo,
			});
		} else {
			roleSpecificData = new RoleModel({
				userId: user._id,
				// ... sprecific data
			});
		}

		await roleSpecificData.save();

		user.roleSpecificData = roleSpecificData._id;
		await user.save();

		res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

export { createNonAdminUser };
