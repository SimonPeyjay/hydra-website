"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import SectionHeader from "./section-header"
import { Reveal, Parallax } from "./motion"

const columnA = [
  { src: "/images/photos/Thomas_office.webp", altKey: "thomasAlt" },
  { src: "/images/photos/David_studio.webp", altKey: "davidAlt" },
] as const

const columnB = [
  { src: "/images/photos/Andreas_studio3.webp", altKey: "andreasAlt" },
  { src: "/images/photos/Kitchen.webp", altKey: "kitchenAlt" },
] as const

export default function AboutSection() {
  const t = useTranslations("About")

  return (
    <section id="about" className="py-24 md:py-36 bg-ink scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          index="02"
          label={t("label")}
          title={[
            t("titleA"),
            t.rich("titleB", { i: (c) => <i className="text-brass">{c}</i> }),
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Sticky narrative */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-7">
              <Reveal>
                <p className="text-lg md:text-xl text-bone/90 leading-relaxed">
                  {t("paragraph1")}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-base text-bone-dim leading-relaxed">
                  {t("paragraph2")}
                </p>
              </Reveal>
              <Reveal delay={150}>
                <blockquote className="border-l border-olive-bright pl-6 py-1 my-10">
                  <p className="font-display italic font-normal text-2xl md:text-[1.85rem] leading-snug text-bone">
                    {t("quote")}
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base text-bone-dim leading-relaxed">
                  {t("paragraph3")}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Image columns drifting at different speeds */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6 items-start">
            <Parallax speed={0.06} className="mt-10 md:mt-20">
              <div className="space-y-4 md:space-y-6">
                {columnA.map((img, i) => (
                  <Reveal key={img.src} delay={i * 100}>
                    <figure>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={img.src}
                          alt={t(img.altKey)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 30vw"
                          loading="lazy"
                          quality={82}
                        />
                      </div>
                      <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-label text-bone-faint">
                        {t(img.altKey)}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Parallax>

            <Parallax speed={-0.05}>
              <div className="space-y-4 md:space-y-6">
                {columnB.map((img, i) => (
                  <Reveal key={img.src} delay={i * 100 + 80}>
                    <figure>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={img.src}
                          alt={t(img.altKey)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 30vw"
                          loading="lazy"
                          quality={82}
                        />
                      </div>
                      <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-label text-bone-faint">
                        {t(img.altKey)}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
