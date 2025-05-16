import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hydra Studios | Premium Music Studio Collective in Malmö",
  description:
    "A premium music studio collective in Malmö, Sweden where artistic vision and technical excellence converge. Book your session today.",
  keywords: ["recording studio", "music production", "Malmö", "Sweden", "mixing", "mastering", "studio booking"],
  authors: [{ name: "Hydra Studios" }],
  openGraph: {
    title: "Hydra Studios | Premium Music Studio Collective in Malmö",
    description:
      "A premium music studio collective in Malmö, Sweden where artistic vision and technical excellence converge.",
    url: "https://hydrastudios.se",
    siteName: "Hydra Studios",
    images: [
      {
        url: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway_logo.jpg",
        width: 1200,
        height: 630,
        alt: "Hydra Studios - Premium Music Studio Collective",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydra Studios | Premium Music Studio Collective in Malmö",
    description:
      "A premium music studio collective in Malmö, Sweden where artistic vision and technical excellence converge.",
    images: [
      "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway_logo.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />

        {/* Safari specific icons */}
        <link rel="mask-icon" href="/favicon.svg" color="#556B2F" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" sizes="180x180" />

        {/* PWA support */}
        <meta name="theme-color" content="#556B2F" />
        <link rel="manifest" href="/manifest.json" />

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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
