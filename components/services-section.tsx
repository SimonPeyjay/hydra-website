"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import SectionHeader from "./section-header"
import { Reveal } from "./motion"

const serviceKeys = ["recording", "mixing", "production", "mastering", "collaboration", "residency"] as const

const serviceImages: Record<string, string> = {
  recording: "/images/photos/Andreas_studio.webp",
  mixing: "/images/photos/Dennis_studio.webp",
  production: "/images/photos/David_studio2.webp",
  mastering: "/images/photos/Peter_studio.webp",
  collaboration: "/images/photos/Kitchen.webp",
  residency: "/images/photos/Hallway.webp",
}

export default function ServicesSection() {
  const [openKey, setOpenKey] = useState<string | null>(serviceKeys[0])
  const t = useTranslations("Services")

  return (
    <section id="services" className="py-24 md:py-36 bg-ink scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="04"
          label={t("label")}
          title={[
            t("titleA"),
            t.rich("titleB", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
          sub={t("subtitle")}
        />

        <div>
          {serviceKeys.map((key, index) => {
            const isOpen = openKey === key
            const features = t.raw(`${key}.features`) as string[]
            return (
              <Reveal
                key={key}
                delay={index * 50}
                className={cn(
                  "border-t border-line",
                  index === serviceKeys.length - 1 && "border-b",
                )}
              >
                <h3>
                  <button
                    className="group w-full grid grid-cols-12 gap-4 items-center py-6 md:py-8 text-left"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${key}`}
                  >
                    <span
                      className={cn(
                        "col-span-2 md:col-span-1 font-mono text-[11px] transition-colors duration-300",
                        isOpen ? "text-olive-bright" : "text-bone-faint group-hover:text-olive-bright",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "col-span-8 md:col-span-10 font-display font-normal text-3xl md:text-5xl leading-none transition-all duration-500 ease-out",
                        isOpen ? "text-bone md:translate-x-3" : "text-bone/70 group-hover:text-bone md:group-hover:translate-x-3",
                      )}
                    >
                      {t(`${key}.title`)}
                    </span>
                    <span className="col-span-2 md:col-span-1 flex justify-end">
                      <Plus
                        size={22}
                        strokeWidth={1.5}
                        className={cn(
                          "text-bone-dim transition-transform duration-500 ease-out",
                          isOpen && "rotate-45 text-olive-bright",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${key}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 md:pb-12 md:pl-[8.333%]">
                      <div className="md:col-span-6">
                        <p className="text-bone-dim text-base leading-relaxed mb-8 max-w-lg">
                          {t(`${key}.description`)}
                        </p>
                        <ul className="space-y-2.5 mb-9">
                          {features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-wider text-bone-dim"
                            >
                              <span className="text-olive-bright" aria-hidden="true">—</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="#contact"
                          className="link-underline font-mono text-[11px] uppercase tracking-label text-bone pb-1"
                        >
                          {t("cta")}
                        </Link>
                      </div>
                      <div className="md:col-span-5 md:col-start-8">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={serviceImages[key]}
                            alt={t(`${key}.title`)}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            loading="lazy"
                            quality={80}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
