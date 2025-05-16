import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Define the expected request body structure
type FormData = {
  name: string
  email: string
  phone?: string
  project: string
  message: string
  studio?: string
  dateRange?: string
}

/**
 * Validates the form data
 * @param data Form data to validate
 * @returns Object containing validation result and any error messages
 */
function validateFormData(data: Partial<FormData>) {
  const errors: Record<string, string> = {}

  // Required fields
  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required"
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid"
  }

  if (!data.project || data.project.trim() === "") {
    errors.project = "Project type is required"
  }

  if (!data.message || data.message.trim() === "") {
    errors.message = "Message is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Maps studio ID to full name
 * @param studioId The studio ID from the form
 * @returns The full name of the studio/person
 */
function getStudioFullName(studioId: string): string {
  const studioMap: Record<string, string> = {
    andreas: 'Andreas "Stone" Johansson',
    costa: "Costa Leon",
    simon: "Simon Peyron",
    david: "David Fremberg",
    peter: "Peter Zimny",
    angelino: "Angelino Markenhorn",
    denniz: "Denniz Jamm",
    thomas: "Thomas Wallén (Publishing)",
  }

  return studioMap[studioId] || "No specific preference"
}

/**
 * Formats the project type for display
 * @param projectType The project type from the form
 * @returns Formatted project type
 */
function formatProjectType(projectType: string): string {
  const projectMap: Record<string, string> = {
    recording: "Recording",
    mixing: "Mixing",
    mastering: "Mastering",
    production: "Full Production",
    other: "Other",
  }

  return projectMap[projectType] || projectType
}

/**
 * POST handler for the email sending endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = (await request.json()) as FormData

    // Validate the form data
    const validation = validateFormData(data)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validation.errors },
        { status: 400 },
      )
    }

    // Create a formatted email body
    const studioName = data.studio ? getStudioFullName(data.studio) : "No specific preference"
    const projectType = formatProjectType(data.project)

    const emailBody = `
      <h2>New Booking Request from Hydra Studios Website</h2>
      
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      
      <h3>Project Details:</h3>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Preferred Studio/Producer:</strong> ${studioName}</p>
      ${data.dateRange ? `<p><strong>Preferred Dates:</strong> ${data.dateRange}</p>` : ""}
      
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
      
      <hr>
      <p><em>This email was sent from the Hydra Studios website contact form.</em></p>
    `

    // Configure Nodemailer transporter
    // IMPORTANT: Set up these environment variables in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
      port: Number(process.env.SMTP_PORT), // e.g., 587
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your email password or app password
      },
    })

    // Set up email options
    const mailOptions = {
      from: process.env.SMTP_FROM || "website@hydrastudios.se",
      to: "info@hydrastudios.se",
      subject: "Ny bokningsförfrågan via Hydra Studios webbformulär",
      html: emailBody,
      // Add CC if needed
      // cc: data.studio ? `${data.studio}@hydrastudios.se` : undefined,
      replyTo: data.email,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Error sending email:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
