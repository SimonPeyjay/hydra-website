"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { X, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import SectionHeader from "./section-header"
import { Reveal } from "./motion"

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
  const [hoverKey, setHoverKey] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const hoverRef = useRef<string | null>(null)
  hoverRef.current = hoverKey
  const t = useTranslations("Studios")

  /* Cursor-following preview (fine pointers only) */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    let raf = 0
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14
      pos.current.y += (target.current.y - pos.current.y) * 0.14
      const tilt = Math.max(Math.min((target.current.x - pos.current.x) * 0.02, 5), -5)
      const el = previewRef.current
      if (el) {
        const visible = hoverRef.current !== null
        el.style.transform = `translate3d(${pos.current.x.toFixed(1)}px, ${pos.current.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg) scale(${visible ? 1 : 0.85})`
        el.style.opacity = visible ? "1" : "0"
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onListMouseMove = useCallback((e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY }
  }, [])

  const openStudio = useCallback((key: string) => {
    setActiveStudioKey(key)
    setActiveImageIndex(0)
  }, [])

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
    <section id="studios" className="py-24 md:py-36 bg-ink scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="01"
          label={t("label")}
          title={[
            t.rich("titleA", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
          sub={t("subtitle")}
        />

        {/* Index rows */}
        <div role="list" aria-label={t("title")} onMouseMove={onListMouseMove}>
          {studioKeys.map((key, index) => {
            const imageAlts = t.raw(`${key}.images`) as string[]
            const features = t.raw(`${key}.features`) as string[]
            return (
              <Reveal
                key={key}
                delay={index * 60}
                className={cn(
                  "group relative border-t border-line cursor-pointer",
                  index === studioKeys.length - 1 && "border-b",
                )}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={t("viewDetails", { name: t(`${key}.name`) })}
                  className="grid grid-cols-12 gap-x-4 gap-y-5 items-center py-7 md:py-9 transition-colors duration-500"
                  onClick={() => openStudio(key)}
                  onMouseEnter={() => setHoverKey(key)}
                  onMouseLeave={() => setHoverKey(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openStudio(key)
                    }
                  }}
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-[11px] text-bone-faint group-hover:text-olive-bright transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Mobile image */}
                  <div className="col-span-12 order-first md:hidden relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={studioImages[key][0].src}
                      alt={imageAlts[0]}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      loading="lazy"
                      quality={80}
                    />
                  </div>

                  <h3 className="col-span-10 md:col-span-4 font-display font-normal text-3xl md:text-[2.75rem] leading-none text-bone transition-transform duration-500 ease-out md:group-hover:translate-x-3">
                    {t(`${key}.name`)}
                  </h3>

                  <p className="col-span-12 md:col-span-4 text-sm text-bone-dim leading-relaxed md:pr-8">
                    {t(`${key}.description`)}
                  </p>

                  <div className="col-span-10 md:col-span-2 flex flex-wrap gap-x-3 gap-y-1">
                    {features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[10px] uppercase tracking-label text-bone-faint whitespace-nowrap"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <span className="col-span-2 md:col-span-1 flex justify-end text-bone-faint group-hover:text-bone transition-all duration-300 md:group-hover:-translate-y-1 md:group-hover:translate-x-1">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Floating cursor preview (desktop only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="hidden lg:block fixed top-0 left-0 z-40 w-[clamp(260px,24vw,400px)] aspect-[4/3] pointer-events-none overflow-hidden opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      >
        {studioKeys.map((key) => (
          <Image
            key={key}
            src={studioImages[key][0].src}
            alt=""
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              hoverKey === key ? "opacity-100" : "opacity-0",
            )}
            sizes="400px"
            loading="lazy"
            quality={80}
          />
        ))}
        <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-label text-bone bg-ink/70 px-2 py-1">
          {hoverKey ? t(`${hoverKey}.name`) : ""}
        </span>
      </div>

      {/* Detail modal */}
      {activeStudioKey && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-ink/90 backdrop-blur-sm"
          onClick={() => setActiveStudioKey(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-modal-title"
        >
          <div
            className="bg-ink-raised border border-line max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 md:px-8 py-5 border-b border-line flex justify-between items-center">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-olive-bright">
                  {String(studioKeys.indexOf(activeStudioKey as (typeof studioKeys)[number]) + 1).padStart(2, "0")}
                </span>
                <h3
                  id="studio-modal-title"
                  className="font-display font-normal text-3xl md:text-4xl text-bone"
                >
                  {t(`${activeStudioKey}.name`)}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                className="text-bone-dim hover:text-bone p-2 transition-colors"
                onClick={() => setActiveStudioKey(null)}
                aria-label={t("closeModal")}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="relative h-[46vh]">
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
                <div
                  className="px-6 md:px-8 pt-4 flex gap-2 overflow-x-auto scrollbar-hide"
                  role="tablist"
                  aria-label={t("studioImages")}
                >
                  {studioImages[activeStudioKey].map((image, index) => (
                    <button
                      key={index}
                      className={cn(
                        "relative w-20 h-14 flex-shrink-0 cursor-pointer overflow-hidden transition-opacity duration-200",
                        activeImageIndex === index
                          ? "opacity-100 ring-1 ring-olive-bright"
                          : "opacity-50 hover:opacity-80",
                      )}
                      onClick={() => setActiveImageIndex(index)}
                      role="tab"
                      aria-selected={activeImageIndex === index}
                      aria-label={(t.raw(`${activeStudioKey}.images`) as string[])[index]}
                    >
                      <Image src={image.src} alt="" fill className="object-cover" sizes="80px" quality={70} />
                    </button>
                  ))}
                </div>
              )}

              <div className="px-6 md:px-8 py-6 md:py-8">
                <p className="text-bone/85 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  {t(`${activeStudioKey}.description`)}
                </p>

                <h4 className="font-mono text-[11px] uppercase tracking-label text-olive-bright mb-4">
                  {t("features")}
                </h4>
                <div className="flex flex-wrap gap-2 mb-10">
                  {(t.raw(`${activeStudioKey}.features`) as string[]).map((feature, index) => (
                    <span
                      key={index}
                      className="border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider text-bone-dim"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end border-t border-line pt-6">
                  <button
                    className="font-mono text-[11px] uppercase tracking-label bg-bone text-ink px-7 py-4 rounded-full hover:bg-olive-bright transition-colors duration-300"
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
