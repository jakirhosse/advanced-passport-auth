import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailService';

export const sendVerificationEmail = async (userId: string, email: string) => {
  const verificationToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  await sendEmail(email, 'Email Verification', `Verify your email by clicking here: ${verificationLink}`);
};

export const verifyAccount = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('Invalid or expired token');
  }
  user.isVerified = true;
  await user.save();
  return { message: 'Account verified successfully' };
};
