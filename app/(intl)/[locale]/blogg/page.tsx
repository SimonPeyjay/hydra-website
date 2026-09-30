import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import BlogIndex, { blogIndexMetadata } from "@/components/blog-index"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return blogIndexMetadata(locale)
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <BlogIndex locale={locale} />
}
