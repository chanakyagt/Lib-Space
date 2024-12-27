import { z } from "zod";

export const bookResolver = z.object({
    title:z.string().min(3,"book name must at least contain 3 characters"),
    author:z.string().min(5,"author name must at least contain 5 characters"),
    isbn:z
    .string()
    .refine((value) => {
      // Remove hyphens from the ISBN
      const numericISBN = value.replace(/-/g, '');
      // Check if the numeric ISBN is either 10 or 13 digits long
      return /^\d{10}$|^\d{13}$/.test(numericISBN);
    }, {
      message: 'ISBN must be either 10 or 13 digits, allowing for hyphens as separators',
    }),
      summary:z.string().optional(),
      tags:z.array(z.string().min(2,'each tag must at least have 2 letters')).min(2,'at least tags must be provided ').max(5,'at max 5 tags can be provided').optional(),
      availableQuantity:z.coerce.number().min(0, 'Available quantity must be a non-negative number'),
      borrowedBy:z.array(z.string()).optional()  

})