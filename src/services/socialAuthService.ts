import User from '../models/userModel';

export const handleGoogleLogin = async (profile: any) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      isVerified: true,
    });
    await user.save();
  }
  return user;
};

export const handleGitHubLogin = async (profile: any) => {
  let user = await User.findOne({ githubId: profile.id });
  if (!user) {
    user = new User({
      githubId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      isVerified: true,
    });
    await user.save();
  }
  return user;
};
