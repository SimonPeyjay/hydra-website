import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { JSDOM } from "jsdom"

const outDir = path.resolve(__dirname, "../../out")

function page(route: string): Document {
  const html = fs.readFileSync(path.join(outDir, route, "index.html"), "utf8")
  return new JSDOM(html).window.document
}

describe("exported Swedish home page", () => {
  const doc = page("")

  it("serves studio photos as resized variants instead of the original", () => {
    const img = doc.querySelector<HTMLImageElement>('img[srcset*="Dennis_studio"]')

    expect(img, "no <img> with a Dennis_studio srcset").not.toBeNull()
    expect(img!.getAttribute("srcset")).toContain("/images/photos/Dennis_studio-400.webp 400w")
    expect(img!.getAttribute("src")).not.toBe("/images/photos/Dennis_studio.webp")
  })

  it("preloads the hero image with high fetch priority", () => {
    const preload = doc.querySelector('link[rel="preload"][as="image"][imagesrcset*="Hallway_logo"]')

    expect(preload, "no image preload for the hero").not.toBeNull()
    expect(preload!.getAttribute("fetchpriority")).toBe("high")
  })

  it("loads the navbar logo eagerly, since it is visible on first paint", () => {
    const logo = doc.querySelector('img[src="/images/svg/hydra-logo-full-white.svg"]')

    expect(logo, "no navbar logo").not.toBeNull()
    expect(logo!.getAttribute("loading")).not.toBe("lazy")
  })
})

// Apache config ships as a plain file, so these only check the rules reach out/.
// Behaviour is verified with curl against the live site.
describe("exported .htaccess", () => {
  const htaccess = fs.readFileSync(path.join(outDir, ".htaccess"), "utf8")

  it("permanently redirects the old /sv/ URLs to the Swedish root", () => {
    expect(htaccess).toContain("RewriteRule ^sv(?:/(.*))?$ /$1 [R=301,L]")
    expect(htaccess).not.toContain("Accept-Language")
  })

  it("lets the edge cache keep HTML pages warm while browsers always revalidate", () => {
    expect(htaccess).toMatch(
      /<FilesMatch "\\\.html\$">\s*Header set Cache-Control "public, max-age=0, s-maxage=600, must-revalidate"/,
    )
  })
})

// Google reads the search result favicon from the home page and wants a square
// icon in a multiple of 48px; many crawlers ask for /favicon.ico directly.
describe("exported favicons and crawler files", () => {
  it("serves /favicon.ico and links icons from the home page itself", () => {
    expect(fs.existsSync(path.join(outDir, "favicon.ico"))).toBe(true)

    const doc = page("")
    expect(doc.querySelector('link[rel="icon"][href="/favicon.ico"]')).not.toBeNull()
    expect(doc.querySelector('link[rel="icon"][href="/icon-48.png"][sizes="48x48"]')).not.toBeNull()
    expect(doc.querySelector('meta[http-equiv="refresh"]')).toBeNull()
  })

  it("publishes robots.txt pointing at the sitemap, which lists every locale and blog post", () => {
    expect(fs.readFileSync(path.join(outDir, "robots.txt"), "utf8")).toContain(
      "Sitemap: https://hydrastudios.se/sitemap.xml",
    )

    const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8")
    expect(sitemap).toContain("<loc>https://hydrastudios.se/</loc>")
    for (const locale of ["en", "de", "ja", "ko"]) {
      expect(sitemap).toContain(`<loc>https://hydrastudios.se/${locale}/</loc>`)
    }
    expect(sitemap).toContain("<loc>https://hydrastudios.se/blogg/skriva-lat-till-melodifestivalen/</loc>")
    expect(sitemap).not.toContain("hydrastudios.se/sv/")
  })
})

describe("exported locale pages", () => {
  it("sets lang, canonical and hreflang in the HTML itself, with trailing slashes", () => {
    const doc = page("en")

    expect(doc.documentElement.lang).toBe("en")
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://hydrastudios.se/en/")
    expect(doc.querySelector('link[rel="alternate"][hreflang="sv"]')?.getAttribute("href")).toBe(
      "https://hydrastudios.se/",
    )
    expect(doc.querySelector('link[rel="alternate"][hreflang="x-default"]')?.getAttribute("href")).toBe(
      "https://hydrastudios.se/",
    )
  })

  it("serves Swedish at the root, not under /sv/", () => {
    const doc = page("")

    expect(doc.documentElement.lang).toBe("sv")
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://hydrastudios.se/")
    expect(fs.existsSync(path.join(outDir, "sv"))).toBe(false)
  })

  it("names the studio's location in the h1 and describes it as a LocalBusiness with phone and hours", () => {
    const doc = page("")

    expect(doc.querySelector("h1")?.textContent).toContain("Musikstudio i Malmö")
    const jsonLd = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)
    expect(jsonLd[0]["@type"]).toBe("LocalBusiness")
    expect(jsonLd[0].telephone).toBe("+46707485294")
    expect(jsonLd[0].openingHoursSpecification[0]).toMatchObject({ opens: "09:00", closes: "20:00" })
  })

  it("publishes blog posts with their own title and BlogPosting data", () => {
    const doc = page("blogg/hur-kommer-man-med-i-eurovision")

    expect(doc.title).toContain("Eurovision")
    const types = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(
      (script) => JSON.parse(script.textContent!)["@type"],
    )
    expect(types).toContain("BlogPosting")
  })
})

describe("exported 404 page", () => {
  it("is served by Apache with the site's layout and kept out of the index", () => {
    expect(fs.readFileSync(path.join(outDir, ".htaccess"), "utf8")).toContain("ErrorDocument 404 /404/index.html")

    const doc = page("404")
    expect(doc.documentElement.lang).toBe("sv")
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute("content")).toContain("noindex")
    expect(doc.querySelector('link[rel="icon"][href="/favicon.ico"]')).not.toBeNull()
  })
})
