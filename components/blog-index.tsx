import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import BlogLayout, { BlogCta, formatDate } from "@/components/blog-layout"
import { BLOG_PATH, postPath, postsFor } from "@/lib/blog"
import { OG_IMAGE, localePath, siteUrl } from "@/lib/site"

export async function blogIndexMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Blog" })
  const url = siteUrl(localePath(locale, `/${BLOG_PATH}/`))

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    // Until posts are translated, other locales only list the Swedish posts, so keep them out of the index.
    robots: { index: locale === routing.defaultLocale, follow: true },
    alternates: { canonical: url },
    openGraph: { title: t("metaTitle"), description: t("metaDescription"), url, type: "website", images: [OG_IMAGE] },
  }
}

export default async function BlogIndex({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Blog" })
  const posts = postsFor(locale)

  return (
    <BlogLayout locale={locale}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("title")}</h1>
        <p className="text-lg text-white/70 mb-4">{t("intro")}</p>
        {posts.some((post) => post.locale !== locale) && <p className="text-sm text-white/50 mb-4">{t("swedishOnly")}</p>}

        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-white/10 pb-10" lang={post.locale}>
              <time dateTime={post.published} className="text-sm text-white/50">
                {formatDate(post.published, post.locale)}
              </time>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                <Link href={postPath(post)} className="hover:text-[#B08D57] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-white/70 mb-4">{post.description}</p>
              <Link href={postPath(post)} className="text-[#B08D57] hover:text-[#c9a46a] font-medium" aria-hidden="true" tabIndex={-1}>
                {t("readMore")} →
              </Link>
            </li>
          ))}
        </ul>

        <BlogCta locale={locale} />
      </div>
    </BlogLayout>
  )
}
