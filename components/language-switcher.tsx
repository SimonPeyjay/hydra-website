"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const locales = [
  { code: "sv", label: "Svenska" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = locales.find((l) => l.code === locale) || locales[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm uppercase tracking-wider font-medium transition-all duration-300 px-2 py-1"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{current.code.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 bg-[#1A1A1A] border border-white/10 rounded shadow-xl min-w-[140px] py-1 z-50"
          role="listbox"
          aria-label="Select language"
        >
          {locales.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10",
                l.code === locale ? "text-[#556B2F] font-medium" : "text-white/80",
              )}
              onClick={() => {
                router.replace(pathname, { locale: l.code })
                setOpen(false)
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
