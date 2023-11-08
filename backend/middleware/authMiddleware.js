import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

// Import the necessary models for different roles
import {
	Warden,
	Storekeeper,
	Accountant,
	Student,
	SuperAdmin,
	StudentMessManager,
} from "../models/index.js";

const allowedRoles = (requiredRoles) =>
	asyncHandler(async (req, res, next) => {
		let token;

		// Read JWT from the 'jwt' cookie
		token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const roleModelMap = {
				warden: Warden,
				storekeeper: Storekeeper,
				accountant: Accountant,
				student: Student,
				superadmin: SuperAdmin,
				studentmessmanager: StudentMessManager,
			};

			const RoleModel = roleModelMap[role];

			if (!RoleModel) {
				return res.status(401).json({ message: "Invalid role specified" });
			}

			req.user = await RoleModel.findById(decoded.userId).select("-password");
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

export { allowedRoles };
