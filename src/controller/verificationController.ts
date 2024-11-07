import { Request, Response } from 'express';
import { sendVerificationEmail, verifyAccount } from '../services/verificationService';

export const sendVerification = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const email = req.user?.email;
    await sendVerificationEmail(userId, email);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyUserAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    await verifyAccount(token);
    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
