"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./language-switcher"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations("Navbar")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled ? "bg-[#121212]/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-[#121212] focus:text-white focus:rounded"
        >
          {t("skipToContent")}
        </a>

        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative z-10" aria-label={t("homeLabel")}>
            <Image
              src="/images/svg/hydra-logo-full-white.svg"
              alt="Hydra Studios"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link
              href="#studios"
              className="text-white/80 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#556B2F] after:transition-all after:duration-300 hover:after:w-full text-sm uppercase tracking-wider font-medium transition-colors duration-300"
            >
              {t("studios")}
            </Link>
            <Link
              href="#about"
              className="text-white/80 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#556B2F] after:transition-all after:duration-300 hover:after:w-full text-sm uppercase tracking-wider font-medium transition-colors duration-300"
            >
              {t("about")}
            </Link>
            <Link
              href="#services"
              className="text-white/80 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#556B2F] after:transition-all after:duration-300 hover:after:w-full text-sm uppercase tracking-wider font-medium transition-colors duration-300"
            >
              {t("services")}
            </Link>
            <LanguageSwitcher />
            <Link
              href="#contact"
              className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors duration-300"
            >
              {t("bookNow")}
            </Link>
          </nav>

          <button
            className="md:hidden relative z-[60] p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("toggleMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[55] md:hidden",
          "bg-[#0A0A0A] flex flex-col items-center justify-center",
          "transition-[opacity,transform] duration-200 ease-out",
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col items-center space-y-8" aria-label="Mobile navigation">
          <Link
            href="#studios"
            className="text-white/80 hover:text-white transition-colors duration-150 text-xl uppercase tracking-wider font-medium"
            onClick={closeMenu}
          >
            {t("studios")}
          </Link>
          <Link
            href="#about"
            className="text-white/80 hover:text-white transition-colors duration-150 text-xl uppercase tracking-wider font-medium"
            onClick={closeMenu}
          >
            {t("about")}
          </Link>
          <Link
            href="#services"
            className="text-white/80 hover:text-white transition-colors duration-150 text-xl uppercase tracking-wider font-medium"
            onClick={closeMenu}
          >
            {t("services")}
          </Link>
          <LanguageSwitcher />
          <Link
            href="#contact"
            className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-8 py-3 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-xl uppercase tracking-wider font-medium transition-colors duration-150 mt-4"
            onClick={closeMenu}
          >
            {t("bookNow")}
          </Link>
        </nav>
      </div>
    </>
  )
}
