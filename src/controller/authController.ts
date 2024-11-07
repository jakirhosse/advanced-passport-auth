import { Request, Response } from 'express';
import { registerUser, loginUser, changePassword } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logout successful' });
  });
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id;
    await changePassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
