import { z } from 'zod';

export const registerLoginSchema = z.object({
  UserName: z
    .string()
    .min(1, {
      message:
        'Huch – da hat sich wohl ein Fehler in die E-Mail-Adresse eingeschlichen. Bitte überprüfe deine E-Mail.',
    })
    .email()
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$/),

  Password: z
    .string()
    .min(1, { message: 'Passwort wird benötigt' })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message:
        'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten.',
    }),
});

export type RegistrationLoginType = z.infer<typeof registerLoginSchema>;