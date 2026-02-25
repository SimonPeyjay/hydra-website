"use client"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact"
import { useTranslations } from "next-intl"
import {
  STUDIO_MAP,
  PROJECT_TYPE_MAP,
  type StudioId,
  type ProjectType,
} from "@/lib/constants"

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")
  const t = useTranslations("Contact")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project: undefined,
      message: "",
      studio: "",
      dateRange: "",
      privacy: undefined as unknown as true,
    },
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus(null)
    setErrorMessage("")

    try {
      const { privacy, ...formFields } = data

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Ny bokningsförfrågan via Hydra Studios",
        from_name: formFields.name,
        ...formFields,
        studio: formFields.studio
          ? STUDIO_MAP[formFields.studio as StudioId]
          : "Ingen preferens",
        project: PROJECT_TYPE_MAP[formFields.project as ProjectType],
        botcheck: "",
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!result.success) throw new Error(result.message)

      setSubmitStatus("success")
      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred.",
      )
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#B08D57]/5 blur-[80px] transform translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
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
                  src="/images/png/hydra-logo-icon-texture-variant@2.png"
                  alt="Hydra Studios"
                  width={80}
                  height={80}
                  className="mb-6"
                />
                <h3 className="text-xl font-bold mb-4">{t("contactInfo")}</h3>
                <p className="text-white/70 mb-6">{t("contactDescription")}</p>
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
                    <h4 className="text-sm font-medium text-white/90">{t("email")}</h4>
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
                    <h4 className="text-sm font-medium text-white/90">{t("location")}</h4>
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
                <h4 className="text-sm font-medium text-white/90 mb-4">{t("followUs")}</h4>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Honeypot anti-spam field */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      {t("nameLabel")} <span className="text-red-500">{t("required")}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
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
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      {t("emailLabel")} <span className="text-red-500">{t("required")}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
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
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-white/90 mb-2">
                      {t("projectLabel")} <span className="text-red-500">{t("required")}</span>
                    </label>
                    <div className="relative">
                      <select
                        id="project"
                        {...register("project")}
                        aria-required="true"
                        aria-invalid={!!errors.project}
                        aria-describedby={errors.project ? "project-error" : undefined}
                        defaultValue=""
                        className={cn(
                          "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors",
                          errors.project ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                        )}
                      >
                        <option value="" disabled>
                          {t("selectProject")}
                        </option>
                        <option value="recording">{t("projectRecording")}</option>
                        <option value="mixing">{t("projectMixing")}</option>
                        <option value="mastering">{t("projectMastering")}</option>
                        <option value="production">{t("projectProduction")}</option>
                        <option value="other">{t("projectOther")}</option>
                      </select>
                      {errors.project && (
                        <p id="project-error" className="text-red-500 text-xs mt-1">
                          {errors.project.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studio" className="block text-sm font-medium text-white/90 mb-2">
                      {t("studioLabel")}
                    </label>
                    <select
                      id="studio"
                      {...register("studio")}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                    >
                      <option value="">{t("noPreference")}</option>
                      <option value="andreas">{t("studioAndreas")}</option>
                      <option value="costa">{t("studioCosta")}</option>
                      <option value="simon">{t("studioSimon")}</option>
                      <option value="david">{t("studioDavid")}</option>
                      <option value="peter">{t("studioPeter")}</option>
                      <option value="denniz">{t("studioDenniz")}</option>
                      <option value="thomas">{t("studioThomas")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateRange" className="block text-sm font-medium text-white/90 mb-2">
                      {t("dateLabel")}
                    </label>
                    <input
                      type="text"
                      id="dateRange"
                      {...register("dateRange")}
                      className="w-full px-4 py-2 bg-[#121212] border border-white/10 rounded text-white/90 focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-colors"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    {t("messageLabel")} <span className="text-red-500">{t("required")}</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      {...register("message")}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={5}
                      className={cn(
                        "w-full px-4 py-2 bg-[#121212] border rounded text-white/90 focus:outline-none focus:ring-2 transition-colors resize-none",
                        errors.message ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-[#556B2F]",
                      )}
                      placeholder={t("messagePlaceholder")}
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="privacy"
                    type="checkbox"
                    {...register("privacy")}
                    className="h-4 w-4 mt-0.5 text-[#556B2F] focus:ring-[#556B2F] border-white/30 rounded"
                  />
                  <div className="ml-2">
                    <label htmlFor="privacy" className="block text-sm text-white/70">
                      {t.rich("privacyText", {
                        link: (chunks) => (
                          <a href="#" className="text-[#556B2F] hover:underline">
                            {t("privacyLink")}
                          </a>
                        ),
                      })}
                    </label>
                    {errors.privacy && (
                      <p id="privacy-error" className="text-red-500 text-xs mt-1">
                        {errors.privacy.message}
                      </p>
                    )}
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-900/20 border border-green-900/30 rounded text-green-500" role="alert">
                    {t("successMessage")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded text-red-500" role="alert">
                    {errorMessage || t("errorMessage")}
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
                        {t("submitting")}
                      </span>
                    ) : (
                      t("submitButton")
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
