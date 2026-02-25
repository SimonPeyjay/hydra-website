import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { HtmlLangSetter } from "./html-lang-setter"

const localeMap: Record<string, string> = {
  sv: "sv_SE",
  en: "en_US",
  de: "de_DE",
  ja: "ja_JP",
  ko: "ko_KR",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  const languages: Record<string, string> = {}
  for (const loc of routing.locales) {
    languages[loc] = `https://hydrastudios.se/${loc}`
  }

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["recording studio", "music production", "Malmö", "Sweden", "mixing", "mastering", "studio booking"],
    authors: [{ name: "Hydra Studios" }],
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: `https://hydrastudios.se/${locale}`,
      siteName: "Hydra Studios",
      images: [
        {
          url: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway_logo.jpg",
          width: 1200,
          height: 630,
          alt: "Hydra Studios - Premium Music Studio Collective",
        },
      ],
      locale: localeMap[locale] || "sv_SE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [
        "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway_logo.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages,
    },
    generator: "v0.dev",
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangSetter locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicStudio",
            name: "Hydra Studios",
            description: "A premium music studio collective in Malmö, Sweden",
            image:
              "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/6d5cb651361b0b1fed8b748fa0258f74b8dbdc18/png/hydra-logo-full-texture-original@2.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Fredriksbergsgatan 7 A",
              addressLocality: "Malmö",
              postalCode: "212 11",
              addressCountry: "SE",
            },
            email: "info@hydrastudios.se",
            url: "https://hydrastudios.se",
            sameAs: ["https://www.facebook.com/hydrasweden", "https://www.instagram.com/hydrasweden"],
          }),
        }}
      />
      {children}
    </NextIntlClientProvider>
  )
}
