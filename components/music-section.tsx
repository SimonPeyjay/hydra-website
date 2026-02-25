"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export default function MusicSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const t = useTranslations("Music")

  return (
    <section id="music" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#556B2F]/4 blur-[200px]"></div>

      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700 ease-out delay-200",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 sm:p-6">
            <iframe
              title={t("playerTitle")}
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/3YNq9Bo45MkK1Eg4rRGrxS?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <p className="text-center text-white/40 text-sm mt-6">
            {t("caption")}
          </p>
        </div>
      </div>
    </section>
  )
}
