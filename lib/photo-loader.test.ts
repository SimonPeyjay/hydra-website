import { describe, it, expect } from "vitest"
import photoLoader from "./photo-loader"

describe("photoLoader", () => {
  it("serves the pre-generated variant for the requested width", () => {
    expect(photoLoader({ src: "/images/photos/Simon_studio.webp", width: 640 })).toBe(
      "/images/photos/Simon_studio-640.webp",
    )
  })

  it("rounds a width without its own variant up to the next generated one", () => {
    expect(photoLoader({ src: "/images/photos/Simon_studio.webp", width: 500 })).toBe(
      "/images/photos/Simon_studio-640.webp",
    )
  })

  it("caps widths above the largest variant at 1920", () => {
    expect(photoLoader({ src: "/images/photos/Simon_studio.webp", width: 3840 })).toBe(
      "/images/photos/Simon_studio-1920.webp",
    )
  })

  it("leaves images outside /images/photos untouched", () => {
    expect(photoLoader({ src: "/images/svg/hydra-logo-full-white.svg", width: 256 })).toBe(
      "/images/svg/hydra-logo-full-white.svg",
    )
    expect(photoLoader({ src: "/images/covers/laurell-habit-640.webp", width: 400 })).toBe(
      "/images/covers/laurell-habit-640.webp",
    )
  })
})
