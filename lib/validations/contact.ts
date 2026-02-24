import { z } from "zod"
import { PROJECT_TYPES, STUDIO_IDS } from "../constants"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name must be at most 200 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Email is invalid")
    .max(254, "Email must be at most 254 characters"),
  phone: z
    .string()
    .max(30, "Phone must be at most 30 characters")
    .default(""),
  project: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: "Please select a project type" }),
  }),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message must be at most 5000 characters"),
  studio: z
    .union([z.enum(STUDIO_IDS), z.literal("")])
    .default(""),
  dateRange: z
    .string()
    .max(200, "Date range must be at most 200 characters")
    .default(""),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
})

export type ContactFormData = z.infer<typeof contactSchema>
