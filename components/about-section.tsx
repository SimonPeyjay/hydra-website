"use client"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const t = useTranslations("About")

  return (
    <section id="about" className="py-24 bg-[#121212] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#556B2F]/5 blur-[150px] transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B08D57]/5 blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t("title")}</h2>

            <div className="space-y-6 text-white/80">
              <p className="text-lg">{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <blockquote className="border-l-4 border-[#556B2F] pl-4 py-2 my-8 text-xl italic">
                {t("quote")}
              </blockquote>
              <p>{t("paragraph3")}</p>
            </div>
          </div>

          <div
            className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-700 ease-out delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="space-y-4">
              <div className="relative h-[200px] rounded overflow-hidden">
                <Image
                  src="/images/photos/Thomas_office.webp"
                  alt={t("thomasAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative h-[250px] rounded overflow-hidden">
                <Image
                  src="/images/photos/David_studio.webp"
                  alt={t("davidAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
            <div className="space-y-4 pt-2 sm:pt-10">
              <div className="relative h-[280px] rounded overflow-hidden">
                <Image
                  src="/images/photos/Andreas_studio3.webp"
                  alt={t("andreasAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative h-[170px] rounded overflow-hidden">
                <Image
                  src="/images/photos/Kitchen.webp"
                  alt={t("kitchenAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
