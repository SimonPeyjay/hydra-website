// Generates the favicons and the social share image from source files in public/.
// Google only shows a favicon that is square, a multiple of 48px and linked from
// the home page, and many crawlers still ask for /favicon.ico directly. Re-run
// after changing public/favicon.svg or the hallway photo:
//   node scripts/generate-icons.mjs

import fs from "fs"
import path from "path"
import sharp from "sharp"

const PUBLIC_DIR = path.resolve(process.cwd(), "public")
const svg = fs.readFileSync(path.join(PUBLIC_DIR, "favicon.svg"))

function renderPng(size) {
  return sharp(svg, { density: Math.ceil((72 * size) / 128) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// Separate names from the old favicon-*.png files, which were all one 1200px
// image, so browsers and Google don't keep serving those from cache.
for (const size of [48, 96, 180, 192, 512]) {
  fs.writeFileSync(path.join(PUBLIC_DIR, `icon-${size}.png`), await renderPng(size))
}

// ICO with embedded PNGs (supported by every browser since Windows Vista).
const icoSizes = [16, 32, 48]
const images = await Promise.all(icoSizes.map(renderPng))
const header = Buffer.alloc(6 + 16 * images.length)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(images.length, 4)
let offset = header.length
images.forEach((image, i) => {
  const entry = 6 + 16 * i
  header.writeUInt8(icoSizes[i], entry) // width
  header.writeUInt8(icoSizes[i], entry + 1) // height
  header.writeUInt8(0, entry + 2) // palette size
  header.writeUInt8(0, entry + 3) // reserved
  header.writeUInt16LE(1, entry + 4) // color planes
  header.writeUInt16LE(32, entry + 6) // bits per pixel
  header.writeUInt32LE(image.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += image.length
})
fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), Buffer.concat([header, ...images]))

// Open Graph / Twitter image, served from our own domain.
await sharp(path.join(PUBLIC_DIR, "images/photos/Hallway_logo.webp"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUBLIC_DIR, "images/og-image.jpg"))
