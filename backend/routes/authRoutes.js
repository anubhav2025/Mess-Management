import express from 'express';
import {
   authTest,
   commonAuthController,
   // registerUser,
   // logoutUser,
   // getUserProfile,
   // updateUserProfile,
   // getUsers,
   // deleteUser,
   // getUserById,
   // updateUser,
} from '../controllers/authController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/test', authTest);
router.post('/login', commonAuthController);

export default router;