"use client"

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { COVER_WIDTHS, releases } from "@/lib/releases"

// Dot indicator: a sliding window of dots that follows the scroll position
const VISIBLE_DOTS = 7
const DOT_STEP = 14 // px — 6px dot + 8px gap

function dotScale(distance: number) {
  if (distance === 0) return 1.35
  if (distance <= 2) return 1
  if (distance === 3) return 0.7
  return 0.45
}

export default function WorkSection() {
  const t = useTranslations("Work")
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const scrollerRef = useRef<HTMLUListElement>(null)
  const drag = useRef<{ startX: number; startLeft: number; lastX: number; lastT: number; v: number } | null>(null)
  const glide = useRef(0)
  const dragged = useRef(false)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)

  // Track which release the scroll position corresponds to
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = el.scrollWidth - el.clientWidth
      const progress = max > 0 ? el.scrollLeft / max : 0
      setActive(Math.round(progress * (releases.length - 1)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      el.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
      cancelAnimationFrame(glide.current)
    }
  }, [])

  // Mouse users can grab and fling the row; touch and trackpads scroll natively
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return
    cancelAnimationFrame(glide.current)
    drag.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft, lastX: e.clientX, lastT: e.timeStamp, v: 0 }
    dragged.current = false
    setDragging(true)
  }

  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d) return
    e.currentTarget.scrollLeft = d.startLeft - (e.clientX - d.startX)
    const dt = e.timeStamp - d.lastT
    if (dt > 0) d.v = (d.lastX - e.clientX) / dt
    // Capture only once it's a real drag — capturing on pointerdown would
    // retarget plain clicks to the row and stop the cover links from opening
    if (!dragged.current && Math.abs(e.clientX - d.startX) > 5) {
      dragged.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    d.lastX = e.clientX
    d.lastT = e.timeStamp
  }

  // Letting go of a drag over a cover must not open it on Spotify
  const onClickCapture = (e: MouseEvent<HTMLUListElement>) => {
    if (!dragged.current) return
    dragged.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  const onPointerUp = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d) return
    drag.current = null
    const el = e.currentTarget
    let v = d.v
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v = 0
    let last = performance.now()
    const step = (now: number) => {
      const dt = now - last
      last = now
      const before = el.scrollLeft
      el.scrollLeft += v * dt
      v *= Math.pow(0.95, dt / 16)
      const atEdge = el.scrollLeft === before && dt > 0
      if (Math.abs(v) > 0.02 && !atEdge) glide.current = requestAnimationFrame(step)
      else setDragging(false)
    }
    glide.current = requestAnimationFrame(step)
  }

  const windowStart = Math.min(
    Math.max(active - Math.floor(VISIBLE_DOTS / 2), 0),
    Math.max(releases.length - VISIBLE_DOTS, 0),
  )

  return (
    <section id="work" className="py-24 bg-[#121212] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#B08D57]/5 blur-[150px] translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("title")}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <ul
        ref={scrollerRef}
        role="list"
        aria-label={t("carouselLabel")}
        tabIndex={0}
        className={cn(
          "relative flex gap-4 md:gap-6 overflow-x-auto overscroll-x-contain scrollbar-hide select-none",
          "px-4 sm:px-6 lg:px-10 scroll-px-4 sm:scroll-px-6 lg:scroll-px-10",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57]/60 focus-visible:ring-inset",
          "[@media(pointer:fine)]:cursor-grab",
          dragging ? "[@media(pointer:fine)]:cursor-grabbing" : "snap-x snap-proximity",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {releases.map((release, index) => (
          <li
            key={release.cover}
            className={cn(
              "group shrink-0 snap-start w-[78vw] sm:w-[45vw] lg:w-[30vw] max-w-[560px]",
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: inView ? `${Math.min(index, 5) * 90}ms` : "0ms" }}
          >
            <a
              href={release.spotify}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              aria-label={t("listenLabel", { title: release.title, artist: release.artist })}
              className="group/link block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#121212]"
            >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.03] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/covers/${release.cover}-640.webp`}
                srcSet={COVER_WIDTHS.map((w) => `/images/covers/${release.cover}-${w}.webp ${w}w`).join(", ")}
                sizes="(min-width: 1867px) 560px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
                width={960}
                height={960}
                loading="lazy"
                decoding="async"
                draggable={false}
                alt={t("coverAlt", { title: release.title, artist: release.artist })}
                className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white",
                  "opacity-0 translate-y-1 transition-all duration-300 ease-out",
                  "group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible/link:opacity-100 group-focus-visible/link:translate-y-0",
                  "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0",
                )}
              >
                {t("listen")}
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </div>
            <div className="mt-4 px-1">
              <p className="!text-base md:!text-lg font-semibold text-white leading-snug">{release.title}</p>
              <p className="!text-sm text-white/55 mt-0.5">{release.artist}</p>
            </div>
            </a>
          </li>
        ))}
      </ul>

      <div
        className="mx-auto mt-10 overflow-hidden"
        style={{ width: VISIBLE_DOTS * DOT_STEP }}
        aria-hidden="true"
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${-windowStart * DOT_STEP}px)` }}
        >
          {releases.map((release, index) => (
            <span key={release.cover} className="flex h-3 shrink-0 items-center justify-center" style={{ width: DOT_STEP }}>
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300 ease-out",
                  index === active ? "bg-[#B08D57]" : "bg-white/30",
                )}
                style={{ transform: `scale(${dotScale(Math.abs(index - active))})` }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
