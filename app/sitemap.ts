import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { posts } from "@/content/blog"
import { BLOG_PATH, postPath } from "@/lib/blog"
import { languageAlternates, localePath, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const home = routing.locales.map((locale) => ({
    url: siteUrl(localePath(locale)),
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages: languageAlternates("/") },
  }))

  // Only the Swedish blog index is indexable until posts are translated (see components/blog-index.tsx).
  const blogIndex = {
    url: siteUrl(localePath(routing.defaultLocale, `/${BLOG_PATH}/`)),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }

  const blogPosts = posts.map((post) => ({
    url: siteUrl(postPath(post)),
    lastModified: post.updated ?? post.published,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...home, blogIndex, ...blogPosts]
}
