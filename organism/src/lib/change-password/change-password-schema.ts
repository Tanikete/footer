import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    OldPassword: z.string()
      .min(1, { message: "Passwort wird benötigt" }),

    Password: z.string()
      .min(1, { message: "Passwort wird benötigt" })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, { message: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten." }),
      

    ConfirmPassword: z
      .string()
      .min(1, { message: "Passwortbestätigung wird benötigt" })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, { message: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten." }),
  })
  .refine(({ Password, ConfirmPassword }) => ConfirmPassword === Password, {
    path: ['ConfirmPassword'],
    message: "Passwort stimmt nicht überein",
  });

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;