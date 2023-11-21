//prefix route '/api/users'
import express from "express";
import {
  authTest,
  nonAdminAuth,
  collegeAdminAuth,
  // registerUser,
  logoutUser,
  // getUserProfile,
  // updateUserProfile,
  // getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
} from "../controllers/authController.js";
// import { protect } from '../middleware/authMiddleware.js';
// 	authTest,
// 	commonAuth,
// 	collegeAdminAuth,
// } from "../controllers/authController.js";

const router = express.Router();

// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post("/test", authTest);
router.post("/login", nonAdminAuth);
router.post("/logout", logoutUser);

export default router;
