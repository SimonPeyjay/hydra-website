"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { useTranslations } from "next-intl"

function rise(delay: number): CSSProperties {
  return { "--rise-delay": `${delay}ms` } as CSSProperties
}

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("Hero")

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${(y * 0.3).toFixed(1)}px, 0)`
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = `${Math.max(1 - y / 600, 0)}`
        contentRef.current.style.transform = `translate3d(0, ${(y * 0.15).toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
      id="main-content"
    >
      {/* Background with parallax drift + slow settle on load */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <div className="absolute inset-[-10%] animate-hero-zoom">
          <Image
            src="/images/photos/Hallway_logo.webp"
            alt={t("bgAlt")}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      {/* Content, anchored low like a record sleeve */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col justify-end"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 pb-10 md:pb-14">
          <p
            className="animate-rise font-mono text-[11px] md:text-xs uppercase tracking-label text-olive-bright mb-5 md:mb-7"
            style={rise(150)}
          >
            {t("kicker")}
          </p>

          <h1 className="font-display font-normal text-[clamp(3.3rem,11.5vw,10.5rem)] leading-[0.92] tracking-[-0.01em] text-bone mb-8 md:mb-12">
            <span className="mask-lines">
              <span className="block animate-rise" style={rise(280)}>
                {t("titleA")}
              </span>
            </span>
            <span className="mask-lines">
              <span className="block animate-rise" style={rise(400)}>
                {t.rich("titleB", {
                  i: (chunks) => <i className="text-brass">{chunks}</i>,
                })}
              </span>
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
            <p
              className="animate-rise md:col-span-5 text-base md:text-lg text-bone/75 leading-relaxed max-w-md"
              style={rise(550)}
            >
              {t("subtitle")}
            </p>

            <div
              className="animate-rise md:col-span-7 flex items-center gap-7 md:justify-end"
              style={rise(650)}
            >
              <Link
                href="#studios"
                className="font-mono text-[11px] uppercase tracking-label bg-bone text-ink px-7 py-4 rounded-full hover:bg-olive-bright transition-colors duration-300"
                aria-label={t("exploreLabel")}
              >
                {t("exploreStudios")}
              </Link>
              <Link
                href="#contact"
                className="link-underline font-mono text-[11px] uppercase tracking-label text-bone pb-1"
                aria-label={t("bookLabel")}
              >
                {t("bookSession")}
              </Link>
            </div>
          </div>
        </div>

        {/* Mono metadata strip */}
        <div className="animate-fade-in border-t border-line" style={rise(900)}>
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 py-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-label text-bone-faint">
            <span>55.60°N — 13.00°E</span>
            <span className="hidden md:inline">Fredriksbergsgatan 7A, Malmö</span>
            <Link
              href="#studios"
              className="flex items-center gap-2 text-bone-dim hover:text-bone transition-colors"
              aria-label={t("scrollLabel")}
            >
              {t("scrollHint")}
              <ArrowDown size={11} className="animate-bounce" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
