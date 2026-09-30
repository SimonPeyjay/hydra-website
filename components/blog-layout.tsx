import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import Footer from "@/components/footer"
import { localePath } from "@/lib/site"

/** Shell for blog pages: the home page navbar only has in-page anchors, so blog pages get a simpler header. */
export default async function BlogLayout({ locale, children }: { locale: string; children: React.ReactNode }) {
  const t = await getTranslations({ locale, namespace: "Blog" })
  const nav = await getTranslations({ locale, namespace: "Navbar" })

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center gap-4">
          <Link href={localePath(locale)} aria-label={nav("homeLabel")}>
            <Image
              src="/images/svg/hydra-logo-full-white.svg"
              alt="Hydra Studios"
              width={120}
              height={40}
              loading="eager"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-wider font-medium">
            <Link href={localePath(locale, "/blogg/")} className="text-white/80 hover:text-white transition-colors">
              {t("title")}
            </Link>
            <Link
              href={localePath(locale, "/#contact")}
              className="bg-[#556B2F] hover:bg-[#657d38] text-white px-4 py-2 rounded transition-colors"
            >
              {nav("bookNow")}
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="container mx-auto px-4 py-16 md:py-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}

/** Renders [text](href) links inside blog text. */
export function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    parts.push(text.slice(last, match.index))
    parts.push(
      <Link key={match.index} href={match[2]} className="text-[#B08D57] underline underline-offset-4 hover:text-[#c9a46a]">
        {match[1]}
      </Link>,
    )
    last = match.index! + match[0].length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

export async function BlogCta({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Blog" })
  return (
    <aside className="mt-16 rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
      <h2 className="text-2xl font-bold mb-3">{t("ctaTitle")}</h2>
      <p className="text-white/70 mb-6 max-w-xl mx-auto">{t("ctaText")}</p>
      <Link
        href={localePath(locale, "/#contact")}
        className="inline-block bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-8 py-3 rounded font-medium transition-all"
      >
        {t("ctaButton")}
      </Link>
    </aside>
  )
}

export function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "Europe/Stockholm" }).format(new Date(date))
}
