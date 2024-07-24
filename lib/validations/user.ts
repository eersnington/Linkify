import * as z from "zod";

export const userNameSchema = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
});

export const ctaFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
});
