"use client"

import { useRef, useState } from "react"
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

type TeamMember = (typeof teamMembers)[number]

// Pixels per second a bio that doesn't fit drifts upward — slow enough to read along.
const ROLL_SPEED = 16
// Seconds before rolling starts: the photo steps aside and the first lines get read.
const ROLL_DELAY = 1.5

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
            <TeamCard key={member} member={member} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  const t = useTranslations("Team")
  const cardRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  // How far the bio rolls up while the card is open; 0 when closed or when it fits.
  const [roll, setRoll] = useState(0)

  const open = () => {
    if (!viewportRef.current || !bioRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setRoll(Math.max(0, bioRef.current.offsetHeight - viewportRef.current.clientHeight))
  }

  // The card stays open while it is either hovered or focused.
  const closeUnlessHovered = () => {
    if (!cardRef.current?.matches(":hover")) setRoll(0)
  }
  const closeUnlessFocused = () => {
    if (document.activeElement !== cardRef.current) setRoll(0)
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group rounded-lg transition-all duration-700 ease-out outline-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
      tabIndex={0}
      role="article"
      aria-label={t(`${member}.name`)}
      onMouseEnter={open}
      onMouseLeave={closeUnlessFocused}
      onFocus={open}
      onBlur={closeUnlessHovered}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[#111]">
        {/* Profile photo — grayscale on desktop. On hover/focus it turns to color
            and steps up into a portrait at the top, so the bio never covers a face. */}
        <div
          className={cn(
            "absolute inset-0 origin-top transition-transform duration-700 ease-out motion-reduce:transition-none",
            "delay-150 md:group-hover:delay-0 md:group-focus-within:delay-0",
            "md:group-hover:translate-y-3 md:group-hover:scale-[0.42]",
            "md:group-focus-within:translate-y-3 md:group-focus-within:scale-[0.42]",
          )}
        >
          <Image
            src={`/images/photos/team/${member}.webp`}
            alt={t(`${member}.name`)}
            fill
            className={cn(
              "object-cover object-top transition-[filter] duration-700 ease-out",
              "md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100",
              "md:group-focus-within:grayscale-0 md:group-focus-within:brightness-100",
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Bio — desktop only. Sits on plain dark below the portrait and rolls
            slowly like credits when it doesn't fit. */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 top-[calc(42%+1.25rem)] hidden md:block px-4",
            "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            "transition-opacity duration-500 ease-out motion-reduce:transition-none",
            "group-hover:delay-300 group-focus-within:delay-300",
          )}
        >
          <div
            ref={viewportRef}
            className="h-full overflow-hidden motion-reduce:overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_0.75rem,black_calc(100%-1.25rem),transparent)]"
          >
            <div
              ref={bioRef}
              className="pt-3 pb-5 space-y-2"
              style={{
                transform: `translateY(-${roll}px)`,
                transition: roll
                  ? `transform ${roll / ROLL_SPEED}s linear ${ROLL_DELAY}s`
                  : "transform 700ms ease-out",
              }}
            >
              <p className="text-sm text-white/85 leading-relaxed">
                {t(`${member}.description`)}
              </p>
              <div className="space-y-1">
                <p className="text-xs text-white/70">
                  <span className="text-[#7FA34A] font-medium">{t("loves")}:</span>{" "}
                  {t(`${member}.likes`)}
                </p>
                <p className="text-xs text-white/70">
                  <span className="text-red-400 font-medium">{t("hates")}:</span>{" "}
                  {t(`${member}.hates`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Name + animal — always visible */}
      <div className="mt-3 px-1">
        <h3 className="!text-base md:!text-lg font-bold text-white">
          {t(`${member}.name`)}
        </h3>
        <p className="!text-sm text-[#7FA34A] font-medium">
          {t(`${member}.animal`)}
        </p>

        {/* Description — mobile only */}
        <div className="md:hidden mt-2">
          <p className="text-sm text-white/80 leading-relaxed">
            {t(`${member}.description`)}
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-white/70">
              <span className="text-[#7FA34A]">{t("loves")}:</span>{" "}
              {t(`${member}.likes`)}
            </p>
            <p className="text-xs text-white/70">
              <span className="text-red-400">{t("hates")}:</span>{" "}
              {t(`${member}.hates`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
