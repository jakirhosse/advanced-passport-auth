import { z } from 'zod';

export const resetPasswordValidation = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
});
