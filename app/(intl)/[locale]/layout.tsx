import type React from "react"
import type { Metadata } from "next"
import "../../globals.css"
import LocaleShell, { localeMetadata } from "@/components/locale-shell"
import { routing } from "@/i18n/routing"

// Swedish has its own root layout at the site root (app/(sv)), so only the other locales are built here.
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.filter((locale) => locale !== routing.defaultLocale).map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return localeMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <LocaleShell locale={locale}>{children}</LocaleShell>
}
