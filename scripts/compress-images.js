const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Configuration
const SOURCE_DIR = path.resolve(process.cwd(), "assets/images")
const TARGET_DIR = path.resolve(process.cwd(), "public/images-compressed")
const QUALITY = 75
const MAPPING_LOG_PATH = path.resolve(process.cwd(), "image-compression-mapping.json")

// Check if --force flag is passed
const forceCompress = process.argv.includes("--force")

// Ensure directories exist
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Source directory ${SOURCE_DIR} does not exist!`)
  process.exit(1)
}

if (!fs.existsSync(TARGET_DIR)) {
  console.log(`Creating target directory ${TARGET_DIR}`)
  fs.mkdirSync(TARGET_DIR, { recursive: true })
}

// Load existing mapping if it exists
let mappingLog = {}
if (fs.existsSync(MAPPING_LOG_PATH)) {
  try {
    mappingLog = JSON.parse(fs.readFileSync(MAPPING_LOG_PATH, "utf8"))
    console.log("Loaded existing mapping log")
  } catch (error) {
    console.warn("Error loading mapping log, starting fresh")
    mappingLog = {}
  }
}

// Get all image files from source directory
const imageFiles = fs.readdirSync(SOURCE_DIR).filter((file) => {
  const ext = path.extname(file).toLowerCase()
  return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)
})

console.log(`Found ${imageFiles.length} image files to process`)

// Process each image
let compressedCount = 0
let skippedCount = 0

for (const file of imageFiles) {
  const sourcePath = path.join(SOURCE_DIR, file)
  const fileName = path.basename(file, path.extname(file))
  const originalExt = path.extname(file)
  const targetPath = path.join(TARGET_DIR, `${fileName}${originalExt}`)
  const webpPath = path.join(TARGET_DIR, `${fileName}.webp`)

  // Check if file has already been compressed and --force is not set
  if (!forceCompress && mappingLog[sourcePath] && fs.existsSync(mappingLog[sourcePath])) {
    console.log(`Skipping ${file} (already compressed)`)
    skippedCount++
    continue
  }

  try {
    // Create WebP version
    console.log(`Compressing ${file} to WebP...`)
    execSync(`npx @squoosh/cli --webp auto ${sourcePath} --webp-quality ${QUALITY} -d ${TARGET_DIR}`)

    // Rename the output file to match original name if needed
    if (fs.existsSync(webpPath) && originalExt.toLowerCase() !== ".webp") {
      // Keep both versions - the WebP and a compressed version with original extension
      console.log(`Creating compressed version with original extension: ${fileName}${originalExt}`)

      // For JPG/JPEG files
      if ([".jpg", ".jpeg"].includes(originalExt.toLowerCase())) {
        execSync(`npx @squoosh/cli --mozjpeg auto ${sourcePath} --mozjpeg-quality ${QUALITY} -d ${TARGET_DIR}`)
      }
      // For PNG files
      else if (originalExt.toLowerCase() === ".png") {
        execSync(`npx @squoosh/cli --oxipng auto ${sourcePath} -d ${TARGET_DIR}`)
      }
    }

    // Update mapping log
    mappingLog[sourcePath] = webpPath
    compressedCount++
  } catch (error) {
    console.error(`Error compressing ${file}:`, error)
  }
}

// Save mapping log
fs.writeFileSync(MAPPING_LOG_PATH, JSON.stringify(mappingLog, null, 2))

console.log("\nCompression Summary:")
console.log(`Total files: ${imageFiles.length}`)
console.log(`Compressed: ${compressedCount}`)
console.log(`Skipped: ${skippedCount}`)
console.log(`Mapping log saved to: ${MAPPING_LOG_PATH}`)
