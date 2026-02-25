"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/svg/hydra-logo-full-white.svg"
                alt="Hydra Studios"
                width={140}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/70 mb-6">{t("about")}</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/hydrasweden"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hydrasweden"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              <li><Link href="#studios" className="text-white/70 hover:text-white transition-colors">{t("ourStudios")}</Link></li>
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("services")}</Link></li>
              <li><Link href="#about" className="text-white/70 hover:text-white transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="#team" className="text-white/70 hover:text-white transition-colors">{t("team")}</Link></li>
              <li><Link href="#contact" className="text-white/70 hover:text-white transition-colors">{t("contact")}</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("servicesTitle")}</h3>
            <ul className="space-y-3">
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("recording")}</Link></li>
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("mixing")}</Link></li>
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("mastering")}</Link></li>
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("production")}</Link></li>
              <li><Link href="#services" className="text-white/70 hover:text-white transition-colors">{t("studioResidency")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="text-[#556B2F] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-white/70">
                  Fredriksbergsgatan 7 A<br />212 11 Malmö<br />SWEDEN
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-[#556B2F] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="text-white/70">info@hydrastudios.se</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/50 hover:text-white/70 text-sm">{t("privacyPolicy")}</Link>
            <Link href="#" className="text-white/50 hover:text-white/70 text-sm">{t("termsOfService")}</Link>
            <Link href="#" className="text-white/50 hover:text-white/70 text-sm">{t("cookiePolicy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
