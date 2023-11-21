import jwt from "jsonwebtoken";

const generateToken = (res, userId, role, mess_id, college_id) => {
	const token = jwt.sign(
		{ userId: userId, role: role, messId: mess_id, collegeAdminId: college_id },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);

	// Set JWT as an HTTP-Only cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
		sameSite: "strict", // Prevent CSRF attacks
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

const generateCollegeAdminToken = (res, userId, college_id) => {
	const token = jwt.sign(
		{ userId: userId, role: "collegeAdmin", collegeAdminId: college_id },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);

	// Set JWT as an HTTP-Only cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
		sameSite: "strict", // Prevent CSRF attacks
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export { generateToken, generateCollegeAdminToken };
