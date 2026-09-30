import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { JSDOM } from "jsdom"

const outDir = path.resolve(__dirname, "../../out")

function page(route: string): Document {
  const html = fs.readFileSync(path.join(outDir, route, "index.html"), "utf8")
  return new JSDOM(html).window.document
}

describe("exported /sv/ page", () => {
  const doc = page("sv")

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

  it("redirects the root on the server, by browser language, falling back to Swedish", () => {
    for (const locale of ["en", "de", "ja", "ko"]) {
      expect(htaccess).toContain(`RewriteCond %{HTTP:Accept-Language} ^${locale} [NC]`)
      expect(htaccess).toContain(`RewriteRule ^$ /${locale}/ [R=302,L,E=LANG_REDIRECT:1]`)
    }
    expect(htaccess).toContain("RewriteRule ^$ /sv/ [R=302,L,E=LANG_REDIRECT:1]")
  })

  it("lets the edge cache keep HTML pages warm while browsers always revalidate", () => {
    expect(htaccess).toMatch(
      /<FilesMatch "\\\.html\$">\s*Header set Cache-Control "public, max-age=0, s-maxage=600, must-revalidate"/,
    )
  })
})
