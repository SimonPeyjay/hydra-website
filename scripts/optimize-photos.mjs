// Generates responsive variants next to every photo in public/images/photos
// (and photos/team) as `{name}-{width}.webp`, for the next/image loader in
// lib/photo-loader.ts. Widths at or above the original's width are plain copies,
// so a photo is never upscaled. Variants that land over their width's byte cap
// are re-encoded to a target size instead.
//
// Requires cwebp and webpinfo (`brew install webp`). Re-run after adding or
// replacing a photo:
//   node scripts/optimize-photos.mjs

import { execFileSync } from "child_process"
import fs from "fs"
import path from "path"

// Width → max bytes. Mirrors the budget checked in lib/photos.test.ts, with some headroom.
const MAX_BYTES = { 256: 14_000, 400: 28_000, 640: 56_000, 960: 100_000, 1280: 160_000, 1920: 280_000 }
const WIDTHS = Object.keys(MAX_BYTES).map(Number)
const QUALITY = 75
const PHOTOS_DIR = path.resolve(process.cwd(), "public/images/photos")

function originalWidth(file) {
  const info = execFileSync("webpinfo", [file], { encoding: "utf8" })
  const match = info.match(/Canvas size (\d+)/) ?? info.match(/Width: (\d+)/)
  return Number(match[1])
}

for (const sub of ["", "team"]) {
  const dir = path.join(PHOTOS_DIR, sub)
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".webp") && !/-\d+\.webp$/.test(file))
    .sort()

  for (const file of files) {
    const source = path.join(dir, file)
    const sourceWidth = originalWidth(source)

    for (const width of WIDTHS) {
      const target = path.join(dir, file.replace(/\.webp$/, `-${width}.webp`))

      if (width >= sourceWidth) {
        fs.copyFileSync(source, target)
        continue
      }

      const encode = (...rate) =>
        execFileSync("cwebp", [
          "-quiet",
          ...rate,
          "-m", "6",
          "-sharp_yuv",
          "-metadata", "none",
          "-resize", String(width), "0",
          source,
          "-o", target,
        ])

      encode("-q", String(QUALITY))
      if (fs.statSync(target).size > MAX_BYTES[width]) {
        encode("-size", String(MAX_BYTES[width]), "-pass", "10")
      }
    }
    console.log(`${path.join(sub, file)} (${sourceWidth}w) → {${WIDTHS.join(",")}}`)
  }
}
