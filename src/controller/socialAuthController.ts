import { Request, Response } from 'express';
import { handleGoogleLogin, handleGitHubLogin } from '../services/socialAuthService';

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const profile = req.user; // Assuming Passport.js middleware handles this
    const user = await handleGoogleLogin(profile);
    res.status(200).json({ message: 'Google login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const githubLogin = async (req: Request, res: Response) => {
  try {
    const profile = req.user; // Assuming Passport.js middleware handles this
    const user = await handleGitHubLogin(profile);
    res.status(200).json({ message: 'GitHub login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
