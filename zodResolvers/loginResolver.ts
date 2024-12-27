import {z} from 'zod';
export const loginResolver = z.object({
    email: z.string().refine((value) => {
        // Simple regex pattern for basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
      }, {
        message: "Invalid email format"
      }),
    password:z.string(),
})