import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import BlogLayout, { BlogCta, InlineText, formatDate } from "@/components/blog-layout"
import { BLOG_PATH, findPost, postPath } from "@/lib/blog"
import { posts } from "@/content/blog"
import { routing } from "@/i18n/routing"
import { LOGO_URL, OG_IMAGE, SITE_URL, STUDIO_ID, localePath, siteUrl } from "@/lib/site"

export const dynamicParams = false

// Posts are Swedish only for now, so they live under the Swedish root.
export function generateStaticParams() {
  return posts.filter((post) => post.locale === routing.defaultLocale).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = routing.defaultLocale
  const post = findPost(locale, slug)
  if (!post) return {}
  const url = siteUrl(postPath(post))

  return {
    title: `${post.title} | Hydra Studios`,
    description: post.description,
    alternates: { canonical: url, languages: { [post.locale]: url } },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      images: [OG_IMAGE],
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = routing.defaultLocale
  setRequestLocale(locale)
  const post = findPost(locale, slug)
  if (!post) notFound()
  const t = await getTranslations({ locale, namespace: "Blog" })

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    inLanguage: post.locale,
    mainEntityOfPage: siteUrl(postPath(post)),
    image: `${SITE_URL}${OG_IMAGE.url}`,
    author: { "@type": "Organization", "@id": STUDIO_ID, name: "Hydra Studios", url: siteUrl(localePath(locale)) },
    publisher: { "@type": "Organization", "@id": STUDIO_ID, name: "Hydra Studios", logo: { "@type": "ImageObject", url: LOGO_URL } },
  }

  return (
    <BlogLayout locale={locale}>
      <article className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Link href={localePath(locale, `/${BLOG_PATH}/`)} className="text-sm text-white/60 hover:text-white">
          ← {t("allPosts")}
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mt-6 mb-4">{post.title}</h1>
        <time dateTime={post.published} className="block text-sm text-white/50 mb-10">
          Hydra Studios · {formatDate(post.published, post.locale)}
        </time>

        <div className="space-y-6 text-lg leading-relaxed text-white/85">
          {post.blocks.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={index} className="text-2xl md:text-3xl font-bold text-white pt-6">
                  {block.text}
                </h2>
              )
            }
            if (block.type === "ul") {
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 marker:text-[#B08D57]">
                  {block.items.map((item, i) => (
                    <li key={i}>
                      <InlineText text={item} />
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index}>
                <InlineText text={block.text} />
              </p>
            )
          })}
        </div>

        <BlogCta locale={locale} />
      </article>
    </BlogLayout>
  )
}
