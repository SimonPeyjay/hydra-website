// Converts release covers named "NN - Artist - Title.jpg" into responsive WebP
// files at public/images/covers/{slug}-{width}.webp for the work carousel.
// Byte-identical covers are converted once (the first file wins). Grainy covers
// that land over their width's byte cap are re-encoded to a target size instead.
//
// Requires cwebp (`brew install webp`). Usage:
//   node scripts/optimize-covers.mjs "<folder with covers>"

import { execFileSync } from "child_process"
import { createHash } from "crypto"
import fs from "fs"
import path from "path"

// Width → max bytes. Mirrors the budget checked in lib/releases.test.ts.
const MAX_BYTES = { 400: 38_000, 640: 76_000, 960: 142_000 }
const WIDTHS = Object.keys(MAX_BYTES).map(Number)
const QUALITY = 72
const TARGET_DIR = path.resolve(process.cwd(), "public/images/covers")

const sourceDir = process.argv[2]
if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error('Usage: node scripts/optimize-covers.mjs "<folder with covers>"')
  process.exit(1)
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

fs.mkdirSync(TARGET_DIR, { recursive: true })

const files = fs
  .readdirSync(sourceDir)
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort()

const seen = new Map()

for (const file of files) {
  const source = path.join(sourceDir, file)
  const hash = createHash("md5").update(fs.readFileSync(source)).digest("hex")
  if (seen.has(hash)) {
    console.log(`Skipping ${file} (same image as ${seen.get(hash)})`)
    continue
  }
  seen.set(hash, file)

  // "NN - Artist - Title.jpg" → "artist-title"
  const [, ...parts] = path.basename(file, path.extname(file)).split(" - ")
  const slug = slugify(parts.join(" "))

  for (const width of WIDTHS) {
    const target = path.join(TARGET_DIR, `${slug}-${width}.webp`)
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
  console.log(`${file} → ${slug}-{${WIDTHS.join(",")}}.webp`)
}
