"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"

type FormErrors = {
  [key: string]: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
    studio: "",
    dateRange: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.project) {
      newErrors.project = "Please select a project type"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage("")

    try {
      // Send the form data to our API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle validation errors from the server
        if (response.status === 400 && result.errors) {
          setErrors(result.errors)
          throw new Error("Please correct the errors in the form.")
        } else {
          throw new Error(result.message || "Failed to send your message.")
        }
      }

      // Success!
      setSubmitStatus("success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: "",
        studio: "",
        dateRange: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#B08D57]/5 blur-[80px] transform translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Book Your Session</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch to book studio time or discuss your needs with our team.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded">
              <div className="mb-8">
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/6d5cb651361b0b1fed8b748fa0258f74b8dbdc18/png/hydra-logo-icon-texture-variant@2.png"
                  alt="Hydra Studios"
                  width={80}
                  height={80}
                  className="mb-6"
                />
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <p className="text-white/70 mb-6">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-[#556B2F]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Email</h4>
                    <a href="mailto:info@hydrastudios.se" className="text-white/70 hover:text-white transition-colors">
                      info@hydrastudios.se
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#556B2F]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Location</h4>
                    <address className="text-white/70 not-italic">
                      Fredriksbergsgatan 7 A<br />
                      212 11 Malmö
                      <br />
                      SWEDEN
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-sm font-medium text-white/90 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/hydrasweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/hydrasweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-[#1A1A1A] p-6 rounded">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors",
                          errors.name ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                        )}
                        placeholder=""
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors",
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                        )}
                        placeholder=""
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-white/90 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.project}
                        aria-describedby={errors.project ? "project-error" : undefined}
                        className={cn(
                          "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors",
                          errors.project ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                        )}
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        <option value="recording">Recording</option>
                        <option value="mixing">Mixing</option>
                        <option value="mastering">Mastering</option>
                        <option value="production">Full Production</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.project && (
                        <p id="project-error" className="text-red-500 text-xs mt-1">
                          {errors.project}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studio" className="block text-sm font-medium text-white/90 mb-2">
                      Preferred Studio (optional)
                    </label>
                    <select
                      id="studio"
                      name="studio"
                      value={formData.studio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                    >
                      <option value="">No preference</option>
                      <option value="andreas">Andreas "Stone" Johansson</option>
                      <option value="costa">Costa Leon</option>
                      <option value="simon">Simon Peyron</option>
                      <option value="david">David Fremberg</option>
                      <option value="peter">Peter Zimny</option>
                      <option value="angelino">Angelino Markenhorn</option>
                      <option value="denniz">Denniz Jamm</option>
                      <option value="thomas">Thomas Wallén (Publishing)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateRange" className="block text-sm font-medium text-white/90 mb-2">
                      Preferred Dates (optional)
                    </label>
                    <input
                      type="text"
                      id="dateRange"
                      name="dateRange"
                      value={formData.dateRange}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={5}
                      className={cn(
                        "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors resize-none",
                        errors.message ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                      )}
                      placeholder="Tell us about your project and requirements..."
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#556B2F] focus:ring-[#556B2F] border-white/30 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-white/70">
                    I agree to the{" "}
                    <a href="#" className="text-[#556B2F] hover:underline">
                      privacy policy
                    </a>{" "}
                    and consent to being contacted about my inquiry.
                  </label>
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-900/20 border border-green-900/30 rounded text-green-500" role="alert">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded text-red-500" role="alert">
                    {errorMessage || "There was an error sending your message. Please try again."}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-3 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    aria-live="polite"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        Sending...
                      </span>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
