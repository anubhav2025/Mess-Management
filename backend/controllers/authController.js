import asyncHandler from "../middleware/asyncHandler.js";
// import generateToken from "../utils/generateToken.js";
import {
  generateToken,
  generateCollegeAdminToken,
} from "../utils/generateToken.js";
import { roleModelMap } from "../constants.js";
import bcrypt from "bcryptjs";
import User from "../models/users/userModel.js";
import CollegeAdmin from "../models/users/collegeAdminModel.js";

//always use role in all camelCasing.

// @desc    Auth Test & get token
// @route   POST /api/users/login
// @access  Public
const authTest = (req, res) => {
  res.status(200).json({ message: "Hello" });
};

//create a different one for chief warden and superAdmin.

// const commonAuthController = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const roleIndex = await RoleIndex.findOne({ email });
//   if (!roleIndex) {
//     return res.status(404).json({ error: "Email not found" });
//   }

//   const role = roleIndex.role;

//   const RoleModel = roleModelMap[role];
//   const user = await RoleModel.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // console.log(user);

//   const messId = user.messId;

//   if (user && (await matchPassword(user, password))) {
//     generateToken(res, user._id, role, messId);           //this func also attaches token to response stream.

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       messId: user.messId,
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully" });
};

// export { authTest, commonAuthController, logoutUser };
// 	res.status(200).json({ message: "Hello" });
// };

//except collegeAdmin, superAdmin
const commonAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.role, user.messId); //this func also attaches token to response stream.

    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
      messId: user.messId,
      collegeId: user.collegeId,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const collegeAdminAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const collegeAdmin = await CollegeAdmin.findOne({ email });

  if (collegeAdmin && (await collegeAdmin.matchPassword(password))) {
    generateCollegeAdminToken(res, collegeAdmin._id, collegeAdmin.collegeId); //this func also attaches token to response stream.

    res.status(200).json({
      id: collegeAdmin._id,
      role: "collegeAdmin",
      collegeName: collegeAdmin.collegeName,
      image: collegeAdmin.image,
      fname: collegeAdmin.fname,
      lname: collegeAdmin.lname,
      designation: collegeAdmin.designation,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { commonAuth, authTest, collegeAdminAuth, logoutUser };
