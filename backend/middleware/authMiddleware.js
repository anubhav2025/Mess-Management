import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

// Import the necessary models for different roles
import { roleModelMap } from "../constants.js";
import User from "../models/users/userModel.js";
import CollegeAdmin from "../models/users/collegeAdminModel.js";

//except collegeAdmin, superAdmin.
const allowedRoles = (
	requiredRoles //requiredRoles is an array of strings, Eg: ['warden', 'storekeeper']
) =>
	asyncHandler(async (req, res, next) => {
		let token;

		// Read JWT from the 'jwt' cookie
		token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select("-password");
			if (
				!req.user ||
				!requiredRoles.includes(decoded.role) ||
				decoded.messId !== req.user.messId
			) {
				return res.status(401).json({ message: "Not Authorized." }); //maybe not needed.
			}

			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	});

//might be unnecessary
const collegeAdminOnly = (requiredRoles) =>
	asyncHandler(async (req, res, next) => {
		let token;

		// Read JWT from the 'jwt' cookie
		token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await CollegeAdmin.findById(decoded.userId).select(
				"-password"
			);
			if (
				!req.user ||
				!requiredRoles.includes(decoded.role) ||
				decoded.messId !== req.user.messId
			) {
				return res.status(401).json({ message: "Not Authorized." }); //maybe not needed.
			}

			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	});

// const allowedRoles = (requiredRoles) => {
// 	return (req, res, next) => {
// 		if (requiredRoles.includes(req.user.role)) {
// 			next();
// 		} else {
// 			res.status(403).json({ message: "Access denied." });
// 		}
// 	};
// };

export { allowedRoles, collegeAdminOnly };
