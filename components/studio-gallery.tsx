"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

const studioKeys = ["andreas", "costa", "david", "dennis", "simon", "common"] as const

const studioImages: Record<string, { src: string }[]> = {
  andreas: [
    { src: "/images/photos/Andreas_studio.webp" },
    { src: "/images/photos/Andreas_studio2.webp" },
    { src: "/images/photos/Andreas_studio3.webp" },
    { src: "/images/photos/Andreas_studio4.webp" },
  ],
  costa: [
    { src: "/images/photos/Costa_studio.webp" },
    { src: "/images/photos/costa_studio_2.webp" },
  ],
  david: [
    { src: "/images/photos/David_studio.webp" },
    { src: "/images/photos/David_studio2.webp" },
  ],
  dennis: [
    { src: "/images/photos/Dennis_studio.webp" },
  ],
  simon: [
    { src: "/images/photos/Simon_studio.webp" },
    { src: "/images/photos/Simon_studio_2.webp" },
  ],
  common: [
    { src: "/images/photos/Hallway.webp" },
    { src: "/images/photos/Kitchen.webp" },
    { src: "/images/photos/Thomas_office.webp" },
    { src: "/images/photos/Peter_studio.webp" },
    { src: "/images/photos/Plack_area.webp" },
  ],
}

export default function StudioGallery() {
  const [activeStudioKey, setActiveStudioKey] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations("Studios")

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeStudioKey) {
        setActiveStudioKey(null)
      }
    }
    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [activeStudioKey])

  useEffect(() => {
    if (activeStudioKey && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [activeStudioKey])

  useEffect(() => {
    if (activeStudioKey) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeStudioKey])

  return (
    <section id="studios" className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Studio gallery">
          {studioKeys.map((key) => {
            const images = studioImages[key]
            const imageAlts = t.raw(`${key}.images`) as string[]
            return (
              <div
                key={key}
                className="relative group overflow-hidden rounded cursor-pointer h-[300px] transition-transform duration-500 ease-out hover:scale-[1.02]"
                onClick={() => {
                  setActiveStudioKey(key)
                  setActiveImageIndex(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveStudioKey(key)
                    setActiveImageIndex(0)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t("viewDetails", { name: t(`${key}.name`) })}
              >
                <Image
                  src={images[0].src}
                  alt={imageAlts[0]}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 ease-out group-hover:translate-y-[-8px]">
                  <h3 className="text-xl font-bold mb-2">{t(`${key}.name`)}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{t(`${key}.description`)}</p>
                </div>
                <div
                  className="absolute top-4 right-4 w-8 h-8 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Image src="/images/svg/hydra-logo-icon-white.svg" alt="" width={32} height={32} className="w-full h-full" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {activeStudioKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveStudioKey(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-modal-title"
        >
          <div
            className="bg-[#121212] rounded max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 id="studio-modal-title" className="text-2xl font-bold">
                {t(`${activeStudioKey}.name`)}
              </h3>
              <button
                ref={closeButtonRef}
                className="text-white/70 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                onClick={() => setActiveStudioKey(null)}
                aria-label={t("closeModal")}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="relative h-[50vh]">
                <Image
                  src={studioImages[activeStudioKey][activeImageIndex].src}
                  alt={(t.raw(`${activeStudioKey}.images`) as string[])[activeImageIndex]}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={85}
                />
              </div>

              {studioImages[activeStudioKey].length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto" role="tablist" aria-label={t("studioImages")}>
                  {studioImages[activeStudioKey].map((image, index) => (
                    <button
                      key={index}
                      className={cn(
                        "relative w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#556B2F]",
                        activeImageIndex === index ? "ring-2 ring-[#556B2F]" : "",
                      )}
                      onClick={() => setActiveImageIndex(index)}
                      role="tab"
                      aria-selected={activeImageIndex === index}
                      aria-label={(t.raw(`${activeStudioKey}.images`) as string[])[index]}
                    >
                      <Image src={image.src} alt="" fill className="object-cover" sizes="80px" quality={75} />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-6">
                <p className="text-lg mb-6">{t(`${activeStudioKey}.description`)}</p>

                <h4 className="text-lg font-medium mb-3">{t("features")}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {(t.raw(`${activeStudioKey}.features`) as string[]).map((feature: string, index: number) => (
                    <div key={index} className="bg-[#1A1A1A] border border-white/10 rounded p-3 text-center">
                      <span className="text-sm text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    onClick={() => {
                      setActiveStudioKey(null)
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {t("bookStudio")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
