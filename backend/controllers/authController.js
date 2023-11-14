import asyncHandler from "../middleware/asyncHandler.js";
// import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { roleModelMap } from '../constants.js';
import RoleIndex from '../models/RoleIndex.js';
import bcrypt from "bcryptjs";

const matchPassword = async function (user, enteredPassword) {
	const password1 = bcrypt.hashSync(enteredPassword, 10);

	console.log(user.password);
	console.log(password1);
	console.log(enteredPassword);
   
	// if(user.password === password1)
		return true;
	// else
	// 	return false;
}

//always use role in all camelCasing.

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authTest = (req, res) => {
	res.status(200).json({ message: "Hello" });
}

//create a different one for chief warden and superAdmin.
// role
// const commonAuthController = asyncHandler(async (req, res) => {
// 	const { email, password } = req.body;

// 	const user = await User.findOne({ email });

// 	const messId = user.messId;
// 	const role = "student";

// 	if (user && (await user.matchPassword(password))) {
// 		generateToken(res, user._id, role, messId);

// 		res.status(200).json({
// 			_id: user._id,
// 			name: user.name,
// 			email: user.email,
// 			isAdmin: user.isAdmin,
// 		});
// 	} else {
// 		res.status(401);
// 		throw new Error("Invalid email or password");
// 	}
// });
const commonAuthController = asyncHandler(async (req, res) => {
	// res.status(200).json({ message: "Common Auth" });

	const { email, password } = req.body;

	const roleIndex = await RoleIndex.findOne({ email });
	// console.log(email);

	if (!roleIndex) {s
		return res.status(404).json({ error: 'Email not found' });
	}

	const role = roleIndex.role;
	// const role = "student";

	const RoleModel = roleModelMap[role];
	const user = await RoleModel.findOne({ email });
	console.log(user);

	const messId = user.messId;

	// const role = user.role;
	if (user && (await matchPassword(user, password))) {
		generateToken(res, user._id, role, messId); //this func also attaches token to response stream.

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role, // Include the role in the response
			messId: user.messId,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

export {
	commonAuthController,
	authTest
};
