import express from "express";
import {
	authTest,
	commonAuth,
	collegeAdminAuth,
} from "../controllers/authController.js";

const router = express.Router();

// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post("/test", authTest);
router.post("/login", commonAuth);

export default router;
