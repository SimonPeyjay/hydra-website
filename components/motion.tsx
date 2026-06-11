"use client"

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/* ── Reveal: fades/slides children in when they enter the viewport ── */

type RevealProps = {
  children: ReactNode
  as?: ElementType
  variant?: "up" | "line"
  delay?: number
  className?: string
}

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      el.classList.add("is-inview")
      return
    }
    // A "line" starts fully clipped by its overflow-hidden mask, so it never
    // intersects on its own — observe the mask wrapper instead.
    const observed = variant === "line" ? el.parentElement ?? el : el
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-inview")
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(observed)
    return () => io.disconnect()
  }, [variant])

  return (
    <Tag
      ref={ref}
      data-reveal={variant === "line" ? "line" : "up"}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/* ── MaskLine: a single line of text rising out of an overflow mask ── */

export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <span className="mask-lines">
      <Reveal as="span" variant="line" delay={delay} className={cn("block", className)}>
        {children}
      </Reveal>
    </span>
  )
}

/* ── Parallax: child drifts vertically as the wrapper crosses the viewport ── */

export function Parallax({
  children,
  speed = 0.1,
  className,
  innerClassName,
}: {
  children: ReactNode
  speed?: number
  className?: string
  innerClassName?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner || prefersReducedMotion()) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = outer.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < -200 || rect.top > vh + 200) return
      const offset = rect.top + rect.height / 2 - vh / 2
      inner.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  )
}

/* ── Marquee: infinite horizontal scroll of duplicated content ── */

export function Marquee({
  children,
  duration = 40,
  className,
}: {
  children: ReactNode
  duration?: number
  className?: string
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
