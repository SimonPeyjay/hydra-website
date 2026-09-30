// next/image custom loader for the static export: points each srcset entry at
// a pre-generated `{name}-{width}.webp` file (see scripts/optimize-photos.mjs).

/** Widths generated for every photo. Keep next.config.mjs deviceSizes/imageSizes in sync. */
export const PHOTO_WIDTHS = [256, 400, 640, 960, 1280, 1920] as const

type LoaderParams = { src: string; width: number; quality?: number }

export default function photoLoader({ src, width }: LoaderParams): string {
  if (!src.startsWith("/images/photos/")) return src
  const variant = PHOTO_WIDTHS.find((w) => w >= width) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1]
  return src.replace(/\.webp$/, `-${variant}.webp`)
}
