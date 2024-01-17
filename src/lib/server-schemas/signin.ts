import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required."}),
});

export const signUpSchema = z.object({
    firstName: z.string().min(1, {message: "First name is required."}),
    middleName: z.string().min(1, {message: "Middle name is required."}),
    lastName: z.string().min(1, {message: "Last name is required."}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(60, {message: "Password must be less than 60 characters long."}),
    confirmPass: z.string().min(1, {message: "Must confirm your password."})

});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const updatePassSchema = z.object({
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(60, {message: "Password must be less than 60 characters long."}),
    confirmPass: z.string().min(1, {message: "Must confirm your new password."})
})