import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/authInterfaces';

export const registerUser = async (userData: IUser) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { token, user };
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await User.findById(userId);
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    throw new Error('Old password is incorrect');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { message: 'Password changed successfully' };
};
