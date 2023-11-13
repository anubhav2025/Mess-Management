import asyncHandler from "../middleware/asyncHandler.js";
// import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {
	Warden,
	Storekeeper,
	Accountant,
	Student,
	SuperAdmin,
	StudentMessManager,
} from "../models/index.js";

//always use role in all camelCasing.

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const commonAuthController = (
	//create a different one for chief warden and superAdmin.
	// role
) =>
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;

		const roleIndex = await RoleIndex.findOne({ email });

		if (!roleIndex) {
			return res.status(404).json({ error: 'Email not found' });
		}

		const role = roleIndex.role;

		const roleModelMap = {
			"warden": Warden,
			"storeKeeper": Storekeeper,
			"accountant": Accountant,
			"student": Student,
			"superAdmin": SuperAdmin,
			"studentMessManager": StudentMessManager,
		};
		const RoleModel = roleModelMap[role];
		const user = await RoleModel.findOne({ email });

		const messId = user.messId;
		// const role = user.role;
		if (user && (await user.matchPassword(password))) {
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
