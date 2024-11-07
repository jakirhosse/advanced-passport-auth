import { Request, Response } from 'express';
import { sendResetPasswordEmail, resetPassword } from '../services/passwordService';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await sendResetPasswordEmail(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
