"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Marquee } from "./motion"

export default function MarqueeBanner() {
  const t = useTranslations("Marquee")
  const items = t.raw("items") as string[]

  return (
    <div className="border-y border-line bg-ink py-6 md:py-8" aria-hidden="true">
      <Marquee duration={36}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            {i % 2 === 0 ? (
              <span className="font-display italic text-4xl md:text-5xl text-bone whitespace-nowrap">
                {item}
              </span>
            ) : (
              <span className="font-mono text-xs md:text-sm uppercase tracking-label text-bone-dim whitespace-nowrap">
                {item}
              </span>
            )}
            <Image
              src="/images/svg/hydra-logo-icon-white.svg"
              alt=""
              width={18}
              height={18}
              className="mx-8 md:mx-12 opacity-30 w-4 h-4 md:w-[18px] md:h-[18px]"
            />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
