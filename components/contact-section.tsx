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

const inputBase =
  "w-full px-4 py-3 bg-[#0E0E0E] border rounded-lg text-white/90 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
const inputNormal = "border-white/[0.08] focus:ring-[#556B2F]/70 hover:border-white/20"
const inputError = "border-red-500/60 focus:ring-red-500/70"
const selectBase =
  "w-full px-4 py-3 pr-10 bg-[#0E0E0E] border rounded-lg text-white/90 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none"

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}

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
    <section id="contact" className="py-16 md:py-24 bg-[#121212] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#B08D57]/5 blur-[80px] transform translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>

        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Contact Information */}
            <div className="lg:col-span-2 bg-[#1A1A1A] border border-white/[0.06] p-6 md:p-8 rounded-2xl">
              <div className="mb-8">
                <Image
                  src="/images/png/hydra-logo-icon-texture-variant@2.png"
                  alt="Hydra Studios"
                  width={64}
                  height={64}
                  className="mb-6 opacity-90"
                />
                <h3 className="text-lg font-semibold mb-3 text-white/95">{t("contactInfo")}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{t("contactDescription")}</p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="text-[#556B2F] mt-0.5 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">{t("email")}</h4>
                    <a href="mailto:info@hydrastudios.se" className="text-sm text-white/80 hover:text-white transition-colors">
                      info@hydrastudios.se
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-[#556B2F] mt-0.5 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">{t("location")}</h4>
                    <address className="text-sm text-white/80 not-italic leading-relaxed">
                      Fredriksbergsgatan 7 A<br />
                      212 11 Malmö<br />
                      SWEDEN
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/[0.06]">
                <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">{t("followUs")}</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/hydrasweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
            <div className="lg:col-span-3 bg-[#1A1A1A] border border-white/[0.06] p-6 md:p-8 rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot anti-spam field */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("nameLabel")} <span className="text-[#556B2F]">{t("required")}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(inputBase, errors.name ? inputError : inputNormal)}
                        placeholder=""
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-400 text-xs mt-1.5">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("emailLabel")} <span className="text-[#556B2F]">{t("required")}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(inputBase, errors.email ? inputError : inputNormal)}
                        placeholder=""
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-400 text-xs mt-1.5">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className={cn(inputBase, inputNormal)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("projectLabel")} <span className="text-[#556B2F]">{t("required")}</span>
                    </label>
                    <SelectWrapper>
                      <select
                        id="project"
                        {...register("project")}
                        aria-required="true"
                        aria-invalid={!!errors.project}
                        aria-describedby={errors.project ? "project-error" : undefined}
                        defaultValue=""
                        className={cn(
                          selectBase,
                          errors.project ? inputError : inputNormal,
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
                    </SelectWrapper>
                    {errors.project && (
                      <p id="project-error" className="text-red-400 text-xs mt-1.5">
                        {errors.project.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="studio" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("studioLabel")}
                    </label>
                    <SelectWrapper>
                      <select
                        id="studio"
                        {...register("studio")}
                        className={cn(selectBase, inputNormal)}
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
                    </SelectWrapper>
                  </div>
                  <div>
                    <label htmlFor="dateRange" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                      {t("dateLabel")}
                    </label>
                    <input
                      type="text"
                      id="dateRange"
                      {...register("dateRange")}
                      className={cn(inputBase, inputNormal)}
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                    {t("messageLabel")} <span className="text-[#556B2F]">{t("required")}</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      {...register("message")}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={4}
                      className={cn(
                        inputBase,
                        "resize-none",
                        errors.message ? inputError : inputNormal,
                      )}
                      placeholder={t("messagePlaceholder")}
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-400 text-xs mt-1.5">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="privacy"
                    type="checkbox"
                    {...register("privacy")}
                    className="h-4 w-4 mt-0.5 shrink-0 accent-[#556B2F] rounded border-white/20 bg-[#0E0E0E] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="privacy" className="block text-sm text-white/50 leading-relaxed cursor-pointer">
                      {t.rich("privacyText", {
                        link: (chunks) => (
                          <a href="#" className="text-[#6B8A3E] hover:text-[#7FA34A] hover:underline transition-colors">
                            {chunks}
                          </a>
                        ),
                      })}
                    </label>
                    {errors.privacy && (
                      <p id="privacy-error" className="text-red-400 text-xs mt-1.5">
                        {errors.privacy.message}
                      </p>
                    )}
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-800/30 rounded-xl text-emerald-400 text-sm" role="alert">
                    {t("successMessage")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-950/30 border border-red-800/30 rounded-xl text-red-400 text-sm" role="alert">
                    {errorMessage || t("errorMessage")}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#617A35] hover:to-[#758e49] active:from-[#4A5F28] active:to-[#556B2F] text-white px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(85,107,47,0.15)] hover:shadow-[0_0_30px_rgba(85,107,47,0.25)] text-sm uppercase tracking-widest font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#556B2F]/50 focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
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
