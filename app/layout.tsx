import type React from "react"
import { Instrument_Serif, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${display.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="mask-icon" href="/favicon.svg" color="#556B2F" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" sizes="180x180" />
        <meta name="theme-color" content="#0E0D0A" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
