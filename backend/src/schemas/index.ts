import * as z from "zod"

export const LoginSchema = z.object({
  username: z.string().min(1, "Benutzername ist erforderlich!"),
  password: z.string().min(1, "Passwort ist erforderlich!"),
})

export const RegisterSchema = z.object({
  fullName: z.string().min(1, "Name ist erforderlich!"),
  username: z.string().min(1, "Benutzername ist erforderlich!"),
  password: z.string().min(6, "Mindestens 6 Zeichen für das Passwort erforderlich!"),
  confirmPassword: z.string().min(6, "Mindestens 6 Zeichen für das Passwort erforderlich!"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein!",
  path: ["confirm"], // path of error
});