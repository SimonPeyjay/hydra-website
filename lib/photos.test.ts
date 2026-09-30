import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { PHOTO_WIDTHS } from "./photo-loader"

// Max bytes per photo width. Keeps studio/team photos from shipping at full size
// now that next/image picks a variant from the srcset (see lib/photo-loader.ts).
const BUDGET_BYTES: Record<(typeof PHOTO_WIDTHS)[number], number> = {
  256: 15_000,
  400: 30_000,
  640: 60_000,
  960: 110_000,
  1280: 170_000,
  1920: 300_000,
}

const photosDir = path.resolve(__dirname, "../public/images/photos")

// Originals only: variants are named `{name}-{width}.webp`.
const originals = ["", "team"].flatMap((sub) =>
  fs
    .readdirSync(path.join(photosDir, sub))
    .filter((file) => file.endsWith(".webp") && !/-\d+\.webp$/.test(file))
    .map((file) => path.join(sub, file)),
)

describe("photo assets", () => {
  for (const photo of originals) {
    for (const width of PHOTO_WIDTHS) {
      it(`${photo} has a ${width}w WebP within budget`, () => {
        const file = path.join(photosDir, photo.replace(/\.webp$/, `-${width}.webp`))

        expect(fs.existsSync(file), `missing ${file}`).toBe(true)
        expect(fs.statSync(file).size).toBeLessThanOrEqual(BUDGET_BYTES[width])
      })
    }
  }
})
