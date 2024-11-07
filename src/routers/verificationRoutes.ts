import express from 'express';
import { sendVerification, verifyUserAccount } from '../controllers/verificationController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Route for sending verification email (protected route)
router.post('/send-verification', authMiddleware, sendVerification);

// Route for verifying user account
router.post('/verify-account', verifyUserAccount);

export default router;
