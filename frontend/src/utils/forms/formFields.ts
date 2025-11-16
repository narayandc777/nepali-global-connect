import { z } from 'zod';

// EXAMPLE: <SKIPPING VALIDATION>
// email: z.string().optional(),    // leave empty, no email check
// password: z.string().optional(), // leave empty, no min length check

/*
 * Form field definitions<<
 */
export const FormFields = {
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
};

/*
 * Login form fields schemas
 */
export const loginSchema = z.object({
  email: FormFields.email,
  password: FormFields.password,
});

/*
 * registration form
 */
export const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/*
 * reset password schema
 */
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/*
 * forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
