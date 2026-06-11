"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import SectionHeader from "./section-header"
import { Reveal } from "./motion"

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

export default function TeamSection() {
  const t = useTranslations("Team")

  return (
    <section id="team" className="py-24 md:py-36 bg-ink scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="03"
          label={t("label")}
          title={[
            t("titleA"),
            t.rich("titleB", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
          sub={t("subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {teamMembers.map((member, index) => (
            <Reveal
              key={member}
              delay={(index % 4) * 90}
              className="group outline-none"
            >
              <article tabIndex={0} aria-label={t(`${member}.name`)}>
                {/* Portrait */}
                <div className="relative aspect-[3/4] overflow-hidden bg-ink-raised">
                  <Image
                    src={`/images/photos/team/${member}.webp`}
                    alt={t(`${member}.name`)}
                    fill
                    className="object-cover object-top transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-focus-within:grayscale-0 group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    quality={82}
                  />

                  {/* Index chip */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-label text-bone bg-ink/60 backdrop-blur-sm px-2 py-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Hover dossier — desktop */}
                  <div className="absolute inset-0 hidden md:flex flex-col justify-end bg-gradient-to-t from-ink via-ink/55 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 ease-out">
                    <div className="p-5 space-y-3 translate-y-3 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500 ease-out">
                      <p className="text-[13px] text-bone/90 leading-relaxed">
                        {t(`${member}.description`)}
                      </p>
                      <div className="space-y-1.5 border-t border-line pt-3">
                        <p className="text-xs text-bone-dim leading-relaxed">
                          <span className="font-mono text-[10px] uppercase tracking-label text-olive-bright mr-2">
                            {t("loves")}
                          </span>
                          {t(`${member}.likes`)}
                        </p>
                        <p className="text-xs text-bone-dim leading-relaxed">
                          <span className="font-mono text-[10px] uppercase tracking-label text-[#C07A5B] mr-2">
                            {t("hates")}
                          </span>
                          {t(`${member}.hates`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name + call sign */}
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-label text-olive-bright mb-1.5">
                    {t(`${member}.animal`)}
                  </p>
                  <h3 className="font-display font-normal text-2xl leading-tight text-bone">
                    {t(`${member}.name`)}
                  </h3>

                  {/* Dossier — mobile */}
                  <div className="md:hidden mt-3 space-y-2.5">
                    <p className="text-sm text-bone-dim leading-relaxed">
                      {t(`${member}.description`)}
                    </p>
                    <p className="text-xs text-bone-dim leading-relaxed">
                      <span className="font-mono text-[10px] uppercase tracking-label text-olive-bright mr-2">
                        {t("loves")}
                      </span>
                      {t(`${member}.likes`)}
                    </p>
                    <p className="text-xs text-bone-dim leading-relaxed">
                      <span className="font-mono text-[10px] uppercase tracking-label text-[#C07A5B] mr-2">
                        {t("hates")}
                      </span>
                      {t(`${member}.hates`)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
