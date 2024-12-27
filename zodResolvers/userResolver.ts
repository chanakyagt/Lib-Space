import {z} from 'zod'
export const userResolver = z.object({
    name: z.string().min(5, "The name must be more than five characters"),
  
    email: z.string().refine((value) => {
      // Simple regex pattern for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    }, {
      message: "Invalid email format"
    }),
  
    password: z.string()
      .min(8, "The password must be at least 8 characters long")
      .refine((value) => {
        // Example regex pattern for requiring at least one uppercase letter, one lowercase letter, and one digit
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        return passwordPattern.test(value);
      }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      }),
  
    borrowedBooks: z.array(z.string()).optional(),
    userType:z.union([z.literal('Admin'),z.literal('Student')]).default('Student')
  });