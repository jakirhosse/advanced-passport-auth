import express from 'express';
import { register, login, logout, changeUserPassword } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', authMiddleware, logout);

// Route for changing password (protected route)
router.post('/change-password', authMiddleware, changeUserPassword);

export default router;
