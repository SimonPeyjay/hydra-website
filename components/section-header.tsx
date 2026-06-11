"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal, MaskLine } from "./motion"

type SectionHeaderProps = {
  index: string
  label: string
  title: ReactNode[]
  sub?: ReactNode
  className?: string
}

export default function SectionHeader({
  index,
  label,
  title,
  sub,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <Reveal className="flex items-center gap-4 mb-8 md:mb-10">
        <span className="font-mono text-[11px] uppercase tracking-label text-olive-bright shrink-0">
          {index} — {label}
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <h2 className="lg:col-span-8 font-display font-normal text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.01em] text-bone">
          {title.map((line, i) => (
            <MaskLine key={i} delay={i * 120}>
              {line}
            </MaskLine>
          ))}
        </h2>
        {sub && (
          <Reveal delay={200} className="lg:col-span-4">
            <p className="text-bone-dim text-base leading-relaxed lg:max-w-sm lg:ml-auto">
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
