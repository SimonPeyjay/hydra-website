const fs = require("fs")
const path = require("path")

// Create necessary directories if they don't exist
const directories = [
  path.resolve(process.cwd(), "assets/images"),
  path.resolve(process.cwd(), "public/images-compressed"),
]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`)
    fs.mkdirSync(dir, { recursive: true })
  }
})

console.log("Directory structure verified.")
