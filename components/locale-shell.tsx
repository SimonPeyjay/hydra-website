import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import {
  ICONS,
  LOGO_URL,
  OG_IMAGE,
  OG_LOCALES,
  PHONE_E164,
  SITE_URL,
  STUDIO_ID,
  languageAlternates,
  localePath,
  siteUrl,
} from "@/lib/site"

const inter = Inter({ subsets: ["latin"] })

/** Home page metadata for a locale; blog pages override title, description and canonical. */
export async function localeMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const url = siteUrl(localePath(locale))

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    authors: [{ name: "Hydra Studios" }],
    icons: ICONS,
    manifest: "/manifest.json",
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url,
      siteName: "Hydra Studios",
      images: [{ ...OG_IMAGE, alt: t("ogImageAlt") }],
      locale: OG_LOCALES[locale] || "sv_SE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
      languages: languageAlternates("/"),
    },
  }
}

/**
 * <html> for one locale. Swedish (app/(sv)) and the other locales (app/(intl)/[locale])
 * are separate root layouts so Swedish can live at the site root.
 */
export default async function LocaleShell({ locale, children }: { locale: string; children: React.ReactNode }) {
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  const t = await getTranslations({ locale, namespace: "Metadata" })

  const structuredData = [
    {
      "@context": "https://schema.org",
      // schema.org has no studio type (the old "MusicStudio" made Google ignore the block).
      "@type": "LocalBusiness",
      "@id": STUDIO_ID,
      name: "Hydra Studios",
      description: t("description"),
      url: siteUrl(localePath(locale)),
      logo: LOGO_URL,
      image: [siteUrl(OG_IMAGE.url), LOGO_URL],
      telephone: PHONE_E164,
      email: "info@hydrastudios.se",
      foundingDate: "2015-06-14",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Fredriksbergsgatan 7A",
        addressLocality: "Malmö",
        addressRegion: "Skåne",
        postalCode: "212 11",
        addressCountry: "SE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Malmö" },
        { "@type": "AdministrativeArea", name: "Skåne" },
      ],
      knowsAbout: ["Music production", "Recording", "Mixing", "Mastering", "Songwriting", "Melodifestivalen", "Eurovision Song Contest"],
      sameAs: ["https://www.facebook.com/hydrasweden", "https://www.instagram.com/hydrasweden"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteUrl("/#website"),
      name: "Hydra Studios",
      url: siteUrl("/"),
      inLanguage: locale,
      publisher: { "@id": STUDIO_ID },
    },
  ]

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#556B2F" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
