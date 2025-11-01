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
  email: FormFields.email.optional(),
  password: FormFields.password.optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
