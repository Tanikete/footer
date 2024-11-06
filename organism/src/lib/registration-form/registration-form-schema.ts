import { z } from 'zod';

export const registrationSchema = z
    .object({
        firstname: z.string()
            .min(1)
            .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$/),

        lastname: z.string()
            .min(1)
            .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$/),

        dob: z.date(),

        street_name: z.string()
            .min(1),

        house_number: z.string()
            .min(1),

        street2: z.string().optional(),

        zip_code: z.string()
            .regex(/^[0-9]{5}$/),

        city: z.string()
            .min(1),

        country: z.string(),

        email: z.string()
            .min(1, { message: "Huch – da hat sich wohl ein Fehler in die E-Mail-Adresse eingeschlichen. Bitte überprüfe deine E-Mail." })
            .email()
            .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$/),

        confirmEmail: z.string()
            .min(1)
            .email()
            .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$/),

        password: z.string()
            .min(1, { message: "Passwort wird benötigt" })
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, { message: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten." }),

        confirmPassword: z.string()
            .min(1, { message: "Passwort wird benötigt" })
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, { message: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Ziffer enthalten." }),
    })
    .refine(({ email, confirmEmail }) => email === confirmEmail, {
        path: ['email'],
        message: "Bestätigen Sie Ihre E-Mail.",
    })
    .refine(({ password, confirmPassword }) => confirmPassword === password, {
        path: ['password'],
        message: "Vervollständigen Sie die Passwortbestätigung",
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ['confirmPassword'],
        message: "Passwort stimmt nicht überein",
    });

export type RegistrationType = z.infer<typeof registrationSchema>;