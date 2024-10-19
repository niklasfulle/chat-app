import * as z from "zod"

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is requierd"),
  password: z.string().min(1, "Password is requierd"),
})

export const RegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is requierd"),
  username: z.string().min(1, "Username is requierd"),
  password: z.string().min(6, "Minimum 6 characters requierd"),
  confirmPassword: z.string().min(6, "Minimum 6 characters requierd"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match!",
  path: ["confirm"], // path of error
});