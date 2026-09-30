import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import LocaleShell, { localeMetadata } from "@/components/locale-shell"
import { routing } from "@/i18n/routing"

// Swedish is served from the site root. Other locales have their own root layout
// in app/(intl)/[locale]/layout.tsx.
export function generateMetadata(): Promise<Metadata> {
  return localeMetadata(routing.defaultLocale)
}

export default function SwedishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <LocaleShell locale={routing.defaultLocale}>{children}</LocaleShell>
}
