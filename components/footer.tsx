"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal, MaskLine } from "./motion"

const monoLink =
  "font-mono text-[11px] uppercase tracking-label text-bone-dim hover:text-bone transition-colors duration-300"

export default function Footer() {
  const t = useTranslations("Footer")
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Stockholm",
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="bg-ink border-t border-line pt-16 md:pt-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-20 md:mb-28">
          <Reveal className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/svg/hydra-logo-full-white.svg"
                alt="Hydra Studios"
                width={130}
                height={44}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-bone-dim leading-relaxed max-w-[260px]">
              {t("about")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="font-mono text-[10px] uppercase tracking-label text-olive-bright mb-5">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="#studios" className={monoLink}>{t("ourStudios")}</Link></li>
              <li><Link href="#about" className={monoLink}>{t("aboutUs")}</Link></li>
              <li><Link href="#team" className={monoLink}>{t("team")}</Link></li>
              <li><Link href="#services" className={monoLink}>{t("services")}</Link></li>
              <li><Link href="#contact" className={monoLink}>{t("contact")}</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="font-mono text-[10px] uppercase tracking-label text-olive-bright mb-5">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="#services" className={monoLink}>{t("recording")}</Link></li>
              <li><Link href="#services" className={monoLink}>{t("mixing")}</Link></li>
              <li><Link href="#services" className={monoLink}>{t("mastering")}</Link></li>
              <li><Link href="#services" className={monoLink}>{t("production")}</Link></li>
              <li><Link href="#services" className={monoLink}>{t("studioResidency")}</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="font-mono text-[10px] uppercase tracking-label text-olive-bright mb-5">
              {t("contactTitle")}
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-sm text-bone-dim leading-relaxed">
                Fredriksbergsgatan 7 A<br />
                212 11 Malmö, Sweden
              </p>
              <p>
                <a href="mailto:info@hydrastudios.se" className={monoLink}>
                  info@hydrastudios.se
                </a>
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://www.instagram.com/hydrasweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${monoLink} group inline-flex items-center gap-1.5`}
                >
                  Instagram
                  <ArrowUpRight size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="https://www.facebook.com/hydrasweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${monoLink} group inline-flex items-center gap-1.5`}
                >
                  Facebook
                  <ArrowUpRight size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </address>
          </Reveal>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10" aria-hidden="true">
        <h2 className="font-display font-normal text-[clamp(4rem,14.5vw,15rem)] leading-[0.8] tracking-[-0.02em] text-bone whitespace-nowrap select-none">
          <MaskLine>
            Hydra <i className="text-brass">Studios</i>
          </MaskLine>
        </h2>
      </div>

      {/* Legal strip */}
      <div className="border-t border-line mt-[-2px]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-label text-bone-faint">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-label text-bone-faint order-first md:order-none">
            Malmö, SE {time ? `— ${time}` : ""}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-mono text-[10px] uppercase tracking-label text-bone-faint hover:text-bone-dim transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-label text-bone-faint hover:text-bone-dim transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
