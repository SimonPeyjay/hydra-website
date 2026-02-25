"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Mic, Sliders, Music, Headphones, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const serviceKeys = ["recording", "mixing", "production", "mastering", "collaboration", "residency"] as const

const serviceIcons: Record<string, React.ReactNode> = {
  recording: <Mic className="w-6 h-6" />,
  mixing: <Sliders className="w-6 h-6" />,
  production: <Music className="w-6 h-6" />,
  mastering: <Headphones className="w-6 h-6" />,
  collaboration: <Users className="w-6 h-6" />,
  residency: <Calendar className="w-6 h-6" />,
}

const serviceImages: Record<string, string> = {
  recording: "/images/photos/Andreas_studio.webp",
  mixing: "/images/photos/Dennis_studio.webp",
  production: "/images/photos/David_studio2.webp",
  mastering: "/images/photos/Peter_studio.webp",
  collaboration: "/images/photos/Kitchen.webp",
  residency: "/images/photos/Hallway.webp",
}

export default function ServicesSection() {
  const [activeKey, setActiveKey] = useState<string>(serviceKeys[0])
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const t = useTranslations("Services")

  return (
    <section id="services" className="py-24 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-2 mb-12 pb-2 md:pb-0 scrollbar-hide">
            {serviceKeys.map((key) => (
              <button
                key={key}
                className={cn(
                  "px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300",
                  activeKey === key
                    ? "bg-gradient-to-r from-[#556B2F] to-[#657d38] text-white shadow-[0_0_15px_rgba(85,107,47,0.3)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setActiveKey(key)}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="hidden md:inline">{serviceIcons[key]}</span>
                  <span>{t(`${key}.title`)}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-bold mb-4">{t(`${activeKey}.title`)}</h3>
              <p className="text-white/80 mb-6">{t(`${activeKey}.description`)}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {(t.raw(`${activeKey}.features`) as string[]).map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="text-[#556B2F] mt-1">
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
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-3 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors">
                {t("learnMore")}
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative h-[300px] md:h-[400px] rounded overflow-hidden">
                <Image
                  src={serviceImages[activeKey] || "/placeholder.svg"}
                  alt={t(`${activeKey}.title`)}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#556B2F] p-2 rounded-full">{serviceIcons[activeKey]}</div>
                    <h4 className="text-xl font-bold">{t(`${activeKey}.title`)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
