import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { releases } from "./releases"

// Max bytes per cover width. Keeps the work carousel fast on mobile data:
// a phone typically fetches the 640w file, retina desktops and 3x phones the 960w one.
const BUDGET_BYTES: Record<number, number> = {
  400: 40_000,
  640: 80_000,
  960: 150_000,
}

const coversDir = path.resolve(__dirname, "../public/images/covers")

describe("cover assets", () => {
  for (const release of releases) {
    for (const [width, budget] of Object.entries(BUDGET_BYTES)) {
      it(`${release.artist} – ${release.title} has a ${width}w WebP within budget`, () => {
        const file = path.join(coversDir, `${release.cover}-${width}.webp`)

        expect(fs.existsSync(file), `missing ${file}`).toBe(true)
        expect(fs.statSync(file).size).toBeLessThanOrEqual(budget)
      })
    }
  }
})
