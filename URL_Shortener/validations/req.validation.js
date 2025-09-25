// we will create validations for incoming requests as this is possible user kuch bhi galat data bhej sakta hai

import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
    firstname : z.string().min(1, "First name is required"),
    lastname : z.string().min(1).optional(),
    email : z.string().email("Invalid email address"),
    password : z.string().min(6, "Password must be at least 6 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain uppercase, lowercase, number and special character"
    ),
})

export const loginPostRequestBodySchema = z.object({
    email : z.string().email("Invalid email address"),
    password : z.string().min(6)
    
})


export const shortenPostRequestBodySchema = z.object({
    url: z.string().url(),
    code: z.string().optional()
})


export const updatePatchRequestBodySchema = z.object({
    url: z.string().url().optional(),
    code: z.string().optional(),
})


export const updatePatchUserRequestBodySchema = z.object({
    firstname : z.string().min(1, "First name is required").optional(),
    lastname : z.string().min(1).optional(),
    password : z.string().min(6, "Password must be at least 6 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain uppercase, lowercase, number and special character"
    ).optional(),
})



