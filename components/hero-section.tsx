"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const opacity = 1 - Math.min(scrollY / 500, 0.5)
      const translateY = scrollY * 0.4

      heroRef.current.style.opacity = opacity.toString()
      heroRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="main-content">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway_logo.jpg"
          alt="Hydra Studios Hallway"
          fill
          priority
          className="object-cover object-center filter brightness-75 saturate-75"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div ref={heroRef} className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white max-w-4xl leading-tight">
            Where Vision Meets Sonic Excellence
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
            A premium collective of world-class recording studios designed for artists who demand nothing but the best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="#studios"
              className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-8 py-3 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-lg font-medium transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]"
              aria-label="Explore our studios"
            >
              Explore Studios
            </Link>
            <Link
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-3 rounded text-lg font-medium transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]"
              aria-label="Book a recording session"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Link
          href="#studios"
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Scroll to studios section"
        >
          <ChevronDown size={32} />
        </Link>
      </div>

      {/* Audio-inspired animated elements */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-[#556B2F]/10 blur-[100px] animate-pulse"></div>
        <div
          className="absolute right-1/4 bottom-1/3 w-[250px] h-[250px] rounded-full bg-[#B08D57]/10 blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  )
}
