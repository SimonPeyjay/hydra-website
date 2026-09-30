import type { Metadata } from "next"
import BlogIndex, { blogIndexMetadata } from "@/components/blog-index"
import { routing } from "@/i18n/routing"

export function generateMetadata(): Promise<Metadata> {
  return blogIndexMetadata(routing.defaultLocale)
}

export default function Page() {
  return <BlogIndex locale={routing.defaultLocale} />
}
