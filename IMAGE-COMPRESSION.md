# Image Compression for Hydra Studios Website

This document explains how to use the image compression script to optimize images for the website.

## Overview

The image compression script:
- Takes images from `/assets/images`
- Compresses them to WebP format with 75% quality
- Also creates compressed versions with original file extensions
- Saves all compressed images to `/public/images-compressed`
- Maintains a mapping log of original to compressed files
- Skips already compressed files unless forced

## Requirements

The script requires Node.js and the Squoosh CLI package, which is included in the project's devDependencies.

## Usage

### Basic Compression

To compress all images:

\`\`\`bash
npm run compress-images
\`\`\`

This will compress all images that haven't been compressed before.

### Force Compression

To force compression of all images, even if they've been compressed before:

\`\`\`bash
npm run compress-images:force
\`\`\`

### Build Process

Image compression is automatically run before the build process when you run:

\`\`\`bash
npm run build
\`\`\`

## Mapping Log

The script creates a file called `image-compression-mapping.json` in the project root. This file maps original image paths to their compressed versions, which helps the script determine which files have already been compressed.

## Customization

If you need to change compression settings, edit the `scripts/compress-images.js` file:

- `SOURCE_DIR`: Source directory for original images
- `TARGET_DIR`: Target directory for compressed images
- `QUALITY`: WebP compression quality (0-100)

## Troubleshooting

If you encounter issues:

1. Make sure the `/assets/images` directory exists and contains images
2. Check that you have write permissions to the `/public/images-compressed` directory
3. Try running with the `--force` flag to bypass the cache
4. Delete the `image-compression-mapping.json` file to start fresh
\`\`\`

Let's create a simple directory structure to ensure the script works properly:
