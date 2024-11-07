import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/emailService';

export const sendResetPasswordEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await sendEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('Invalid or expired token');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { message: 'Password reset successful' };
};
