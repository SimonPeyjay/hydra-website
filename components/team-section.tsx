"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const teamMembers = [
  "andreas",
  "david",
  "denniz",
  "costa",
  "simon",
  "peter",
  "johan",
  "thomas",
] as const

export default function TeamSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const t = useTranslations("Team")

  return (
    <section id="team" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[150px] transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#B08D57]/5 blur-[100px] transform translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member}
              className={cn(
                "group rounded-lg transition-all duration-700 ease-out outline-none",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
              tabIndex={0}
              role="article"
              aria-label={t(`${member}.name`)}
            >
              {/* Image card with overlay */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#111]">
                {/* Profile image — grayscale default on desktop, color on hover/focus */}
                <Image
                  src={`/images/photos/team/${member}.webp`}
                  alt={t(`${member}.name`)}
                  fill
                  className={cn(
                    "object-cover object-top transition-all duration-700 ease-out",
                    "md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100",
                    "md:group-focus-within:grayscale-0 md:group-focus-within:brightness-100",
                    "md:scale-100 md:group-hover:scale-105 md:group-focus-within:scale-105",
                  )}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover overlay with description — desktop only */}
                <div className={cn(
                  "absolute inset-0 hidden md:flex flex-col justify-end",
                  "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                  "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
                  "transition-opacity duration-700 ease-out",
                )}>
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
                      {t(`${member}.description`)}
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-white/70">
                        <span className="text-[#556B2F] font-medium">{t("loves")}:</span>{" "}
                        {t(`${member}.likes`)}
                      </p>
                      <p className="text-xs text-white/70">
                        <span className="text-red-400/70 font-medium">{t("hates")}:</span>{" "}
                        {t(`${member}.hates`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name + animal — always visible */}
              <div className="mt-3 px-1">
                <h3 className="!text-base md:!text-lg font-bold text-white">
                  {t(`${member}.name`)}
                </h3>
                <p className="!text-sm text-[#556B2F] font-medium">
                  {t(`${member}.animal`)}
                </p>

                {/* Description — mobile only */}
                <div className="md:hidden mt-2">
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t(`${member}.description`)}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-white/70">
                      <span className="text-[#556B2F]">{t("loves")}:</span>{" "}
                      {t(`${member}.likes`)}
                    </p>
                    <p className="text-xs text-white/70">
                      <span className="text-red-400/70">{t("hates")}:</span>{" "}
                      {t(`${member}.hates`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
