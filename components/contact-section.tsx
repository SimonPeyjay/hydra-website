"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact"
import { useTranslations } from "next-intl"
import {
  STUDIO_MAP,
  PROJECT_TYPE_MAP,
  type StudioId,
  type ProjectType,
} from "@/lib/constants"
import SectionHeader from "./section-header"
import { Reveal } from "./motion"

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""

const inputBase =
  "w-full bg-transparent border-b py-3 text-bone text-base placeholder:text-bone-faint focus:outline-none focus-visible:outline-none transition-colors duration-300"
const inputNormal = "border-line hover:border-bone-faint focus:border-olive-bright"
const inputError = "border-red-400/70 focus:border-red-400"
const selectBase =
  "w-full bg-transparent border-b py-3 pr-8 text-bone text-base focus:outline-none focus-visible:outline-none transition-colors duration-300 appearance-none cursor-pointer [&>option]:bg-ink-raised [&>option]:text-bone"
const labelClass =
  "block font-mono text-[10px] uppercase tracking-label text-bone-dim mb-1"

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(233,228,216,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
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
    <section id="contact" className="py-24 md:py-36 bg-ink scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="06"
          label={t("label")}
          title={[
            t("titleA"),
            t.rich("titleB", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
          sub={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
          {/* Contact information */}
          <Reveal className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <p className="text-bone-dim text-base leading-relaxed max-w-sm">
                {t("contactDescription")}
              </p>

              <div>
                <h3 className={labelClass}>{t("email")}</h3>
                <a
                  href="mailto:info@hydrastudios.se"
                  className="link-underline font-display text-2xl md:text-[1.7rem] text-bone pb-0.5"
                >
                  info@hydrastudios.se
                </a>
              </div>

              <div>
                <h3 className={labelClass}>{t("location")}</h3>
                <address className="text-bone/80 not-italic leading-relaxed text-base">
                  Fredriksbergsgatan 7 A<br />
                  212 11 Malmö<br />
                  SWEDEN
                </address>
              </div>

              <div>
                <h3 className={labelClass}>{t("followUs")}</h3>
                <div className="flex flex-col gap-2 items-start">
                  <a
                    href="https://www.instagram.com/hydrasweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-label text-bone-dim hover:text-bone transition-colors"
                    aria-label="Instagram"
                  >
                    Instagram
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/hydrasweden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-label text-bone-dim hover:text-bone transition-colors"
                    aria-label="Facebook"
                  >
                    Facebook
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Booking form */}
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-9" noValidate>
              {/* Honeypot anti-spam field */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {t("nameLabel")} <span className="text-olive-bright">{t("required")}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(inputBase, errors.name ? inputError : inputNormal)}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t("emailLabel")} <span className="text-olive-bright">{t("required")}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(inputBase, errors.email ? inputError : inputNormal)}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={cn(inputBase, inputNormal)}
                  />
                </div>
                <div>
                  <label htmlFor="project" className={labelClass}>
                    {t("projectLabel")} <span className="text-olive-bright">{t("required")}</span>
                  </label>
                  <SelectWrapper>
                    <select
                      id="project"
                      {...register("project")}
                      aria-required="true"
                      aria-invalid={!!errors.project}
                      aria-describedby={errors.project ? "project-error" : undefined}
                      defaultValue=""
                      className={cn(selectBase, errors.project ? inputError : inputNormal)}
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
                    <p id="project-error" className="text-red-400 text-xs mt-2">
                      {errors.project.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                <div>
                  <label htmlFor="studio" className={labelClass}>
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
                  <label htmlFor="dateRange" className={labelClass}>
                    {t("dateLabel")}
                  </label>
                  <input
                    type="text"
                    id="dateRange"
                    {...register("dateRange")}
                    className={cn(inputBase, inputNormal)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  {t("messageLabel")} <span className="text-olive-bright">{t("required")}</span>
                </label>
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
                  <p id="message-error" className="text-red-400 text-xs mt-2">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="privacy"
                  type="checkbox"
                  {...register("privacy")}
                  className="h-4 w-4 mt-0.5 shrink-0 accent-[#556B2F] cursor-pointer"
                />
                <div>
                  <label
                    htmlFor="privacy"
                    className="block text-sm text-bone-dim leading-relaxed cursor-pointer"
                  >
                    {t.rich("privacyText", {
                      link: (chunks) => (
                        <a
                          href="#"
                          className="text-olive-bright hover:underline transition-colors"
                        >
                          {chunks}
                        </a>
                      ),
                    })}
                  </label>
                  {errors.privacy && (
                    <p id="privacy-error" className="text-red-400 text-xs mt-2">
                      {errors.privacy.message}
                    </p>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div
                  className="border border-olive-bright/40 bg-olive/10 p-4 font-mono text-xs text-olive-bright"
                  role="alert"
                >
                  {t("successMessage")}
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="border border-red-400/40 bg-red-950/20 p-4 font-mono text-xs text-red-400"
                  role="alert"
                >
                  {errorMessage || t("errorMessage")}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-mono text-[11px] uppercase tracking-label bg-bone text-ink px-10 py-4 rounded-full hover:bg-olive-bright transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
