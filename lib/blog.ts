import { routing } from "@/i18n/routing"
import { localePath } from "@/lib/site"
import { posts } from "@/content/blog"

/** Inline links in text use Markdown syntax: [text](/sv/#contact). */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }

export type Post = {
  slug: string
  locale: (typeof routing.locales)[number]
  title: string
  /** Meta description and teaser on the blog index, ~150 characters. */
  description: string
  /** ISO date, YYYY-MM-DD. */
  published: string
  updated?: string
  blocks: Block[]
}

/** Blog index and post URLs live under this segment in every locale. */
export const BLOG_PATH = "blogg"

/** Posts are written in Swedish first; other locales fall back to the Swedish list. */
export function postsFor(locale: string): Post[] {
  const own = posts.filter((post) => post.locale === locale)
  const list = own.length > 0 ? own : posts.filter((post) => post.locale === routing.defaultLocale)
  return [...list].sort((a, b) => b.published.localeCompare(a.published))
}

export function findPost(locale: string, slug: string): Post | undefined {
  return posts.find((post) => post.locale === locale && post.slug === slug)
}

export function postPath(post: Post): string {
  return localePath(post.locale, `/${BLOG_PATH}/${post.slug}/`)
}
