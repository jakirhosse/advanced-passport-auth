import express from 'express';
import { forgotPassword, resetUserPassword } from '../controllers/passwordController';

const router = express.Router();

// Route for forgot password
router.post('/forgot-password', forgotPassword);

// Route for resetting password
router.post('/reset-password', resetUserPassword);

export default router;
