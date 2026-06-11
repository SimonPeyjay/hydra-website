"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import SectionHeader from "./section-header"
import { Reveal } from "./motion"

export default function MusicSection() {
  const t = useTranslations("Music")
  const frameRef = useRef<HTMLDivElement>(null)
  const [showEmbed, setShowEmbed] = useState(false)

  // Mount the Spotify iframe only when the section approaches the viewport —
  // the embed steals focus on load, which would otherwise yank the scroll position.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShowEmbed(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowEmbed(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="music" className="py-24 md:py-36 bg-ink scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="05"
          label={t("label")}
          title={[
            t("titleA"),
            t.rich("titleB", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
          sub={t("subtitle")}
        />

        <Reveal delay={150} className="max-w-3xl">
          <div ref={frameRef} className="relative border border-line p-3 md:p-5">
            <span className="absolute -top-[9px] left-5 bg-ink px-3 font-mono text-[10px] uppercase tracking-label text-olive-bright">
              {t("playerLabel")}
            </span>
            {showEmbed ? (
              <iframe
                title={t("playerTitle")}
                src="https://open.spotify.com/embed/playlist/3YNq9Bo45MkK1Eg4rRGrxS?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div
                className="h-[352px] flex items-center justify-center font-mono text-[10px] uppercase tracking-label text-bone-faint"
                aria-hidden="true"
              >
                ●
              </div>
            )}
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-label text-bone-faint">
            {t("caption")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
