import { z } from 'zod';

export const updateProfileSchema = z.object({
  title: z.enum(['Herr', 'Frau', 'Fräulein'], {
    required_error: "Anrede wird benötigt",
  }),

  firstname: z.string()
    .min(1, { message: "Vorname wird benötigt" })
    .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$/, { message: "Ungültiger Vorname" }),

  lastname: z.string()
    .min(1, { message: "Nachname wird benötigt" })
    .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$/, { message: "Ungültiger Nachname" }),

  street1: z.string()
    .min(1, { message: "Straße wird benötigt" }),

  streetnumber: z.string()
    .min(1, { message: "Hausnummer wird benötigt" }),

  street2: z.string().optional(),

  zipcode: z.string()
    .regex(/^[0-9]{5}$/, { message: "Ungültige PLZ" }),

  city: z.string()
    .min(1, { message: "Stadt wird benötigt" }),

  country: z.string().optional(),

  email: z.string()
    .email({ message: "Ungültige E-Mail-Adresse" }) // New email field
    .optional(), // Change to .required() if this field is mandatory
});

export type UpdateProfileType = z.infer<typeof updateProfileSchema>;