import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
});

export const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number"),
});

// Types ke liye
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserIdParams = z.infer<typeof userIdSchema>;
