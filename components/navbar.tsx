"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./language-switcher"

const navItems = [
  { key: "studios", href: "#studios", index: "01" },
  { key: "about", href: "#about", index: "02" },
  { key: "team", href: "#team", index: "03" },
  { key: "services", href: "#services", index: "04" },
] as const

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-ink/85 backdrop-blur-md py-3 border-b border-line"
            : "bg-transparent py-5 border-b border-transparent",
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-ink focus:text-bone"
        >
          {t("skipToContent")}
        </a>

        <div className="mx-auto max-w-[1600px] px-5 md:px-10 flex justify-between items-center">
          <Link href="/" className="relative z-10" aria-label={t("homeLabel")}>
            <Image
              src="/images/svg/hydra-logo-full-white.svg"
              alt="Hydra Studios"
              width={120}
              height={40}
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group font-mono text-[11px] uppercase tracking-label text-bone-dim hover:text-bone transition-colors duration-300"
              >
                <span className="text-bone-faint group-hover:text-olive-bright transition-colors duration-300 mr-1.5">
                  {item.index}
                </span>
                <span className="link-underline pb-0.5">{t(item.key)}</span>
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="#contact"
              className="font-mono text-[11px] uppercase tracking-label bg-bone text-ink px-5 py-2.5 rounded-full hover:bg-olive-bright transition-colors duration-300"
            >
              {t("bookNow")}
            </Link>
          </nav>

          <button
            className="md:hidden relative z-[60] p-3 text-bone"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t("toggleMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[55] md:hidden bg-ink flex flex-col",
          "transition-opacity duration-300 ease-out",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          className="absolute top-4 right-3 p-4 text-bone hover:text-bone-dim transition-colors duration-150"
          onClick={closeMenu}
          aria-label={t("closeMenu")}
        >
          <X size={26} />
        </button>

        <nav
          className="flex-1 flex flex-col justify-center px-8 gap-1"
          aria-label="Mobile navigation"
        >
          {navItems.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "group flex items-baseline gap-4 py-3 border-b border-line",
                "transition-all duration-500 ease-out",
                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
              style={{ transitionDelay: mobileMenuOpen ? `${120 + i * 70}ms` : "0ms" }}
              onClick={closeMenu}
            >
              <span className="font-mono text-[11px] text-olive-bright">{item.index}</span>
              <span className="font-display text-5xl text-bone leading-none">
                {t(item.key)}
              </span>
            </Link>
          ))}

          <div
            className={cn(
              "flex items-center justify-between pt-10 transition-all duration-500 ease-out",
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
            style={{ transitionDelay: mobileMenuOpen ? "420ms" : "0ms" }}
          >
            <LanguageSwitcher />
            <Link
              href="#contact"
              className="font-mono text-[11px] uppercase tracking-label bg-bone text-ink px-6 py-3 rounded-full"
              onClick={closeMenu}
            >
              {t("bookNow")}
            </Link>
          </div>
        </nav>

        <div
          className={cn(
            "px-8 pb-8 pb-[max(2rem,env(safe-area-inset-bottom))] font-mono text-[10px] uppercase tracking-label text-bone-faint",
            "transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: mobileMenuOpen ? "500ms" : "0ms" }}
        >
          Fredriksbergsgatan 7A — Malmö, SE
        </div>
      </div>
    </>
  )
}
