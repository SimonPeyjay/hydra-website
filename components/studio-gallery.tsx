"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type Studio = {
  id: string
  name: string
  description: string
  features: string[]
  images: {
    src: string
    alt: string
  }[]
}

const studios: Studio[] = [
  {
    id: "andreas",
    name: "Andreas Studio",
    description: "A spacious recording environment with state-of-the-art acoustics and vintage equipment.",
    features: ["Neve Console", "Live Room", "Isolation Booth", "Vintage Microphones"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Andreas_studio.jpg",
        alt: "Andreas Studio Main Room",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Andreas_studio2.jpg",
        alt: "Andreas Studio Equipment",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Andreas_studio3.jpg",
        alt: "Andreas Studio Mixing Area",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Andreas_studio4.jpg",
        alt: "Andreas Studio Live Room",
      },
    ],
  },
  {
    id: "costa",
    name: "Costa Studio",
    description: "Intimate recording space with premium acoustics and a warm, inviting atmosphere.",
    features: ["SSL Console", "Acoustic Treatment", "Vintage Synths", "Drum Kit"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Costa_studio.jpg",
        alt: "Costa Studio",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/2f16bdf8d672336a71a9a41e856518267e2a756e/photos/costa%20studio_2.jpg",
        alt: "Costa Studio Equipment",
      },
    ],
  },
  {
    id: "david",
    name: "David Studio",
    description: "Modern production suite with cutting-edge digital equipment and analog warmth.",
    features: ["API Console", "Modular Synths", "Guitar Collection", "Mastering Chain"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/David_studio.jpg",
        alt: "David Studio Main Room",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/David_studio2.jpg",
        alt: "David Studio Equipment",
      },
    ],
  },
  {
    id: "dennis",
    name: "Dennis Studio",
    description: "Specialized mixing and mastering suite with pristine monitoring environment.",
    features: ["Mastering Console", "Reference Monitors", "Analog EQs", "Vintage Compressors"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Dennis_studio.jpg",
        alt: "Dennis Studio Main Room",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Dennis_studio2.jpg",
        alt: "Dennis Studio Equipment",
      },
    ],
  },
  {
    id: "simon",
    name: "Simon Studio",
    description: "Creative production space with a blend of vintage and modern equipment for unique sonic textures.",
    features: ["Analog Synths", "Boutique Outboard", "Vocal Booth", "Custom Acoustics"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/2f16bdf8d672336a71a9a41e856518267e2a756e/photos/Simon%20studio.jpg",
        alt: "Simon Studio Main Room",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/2f16bdf8d672336a71a9a41e856518267e2a756e/photos/Simon%20studio_2.jpg",
        alt: "Simon Studio Equipment",
      },
    ],
  },
  {
    id: "common",
    name: "Common Areas",
    description: "Shared spaces designed for collaboration, relaxation, and inspiration.",
    features: ["Kitchen", "Lounge", "Meeting Room", "Hallway"],
    images: [
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Hallway.jpg",
        alt: "Hallway",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Kitchen.jpg",
        alt: "Kitchen",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Thomas_office.jpg",
        alt: "Thomas Office",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/2f16bdf8d672336a71a9a41e856518267e2a756e/photos/Peter%20studio.jpg",
        alt: "Peter Studio",
      },
      {
        src: "https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/2f16bdf8d672336a71a9a41e856518267e2a756e/photos/Plack%20area.jpg",
        alt: "Plack Area",
      },
    ],
  },
]

export default function StudioGallery() {
  const [activeStudio, setActiveStudio] = useState<Studio | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeStudio) {
        setActiveStudio(null)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [activeStudio])

  // Focus trap for modal
  useEffect(() => {
    if (activeStudio && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [activeStudio])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (activeStudio) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeStudio])

  return (
    <section id="studios" className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Our Premium Studios</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our collection of meticulously designed recording spaces, each with its own unique character and
            capabilities.
          </p>
        </div>

        {/* Studio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Studio gallery">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="relative group overflow-hidden rounded cursor-pointer h-[300px] transition-transform duration-500 ease-out hover:scale-[1.02]"
              onClick={() => {
                setActiveStudio(studio)
                setActiveImageIndex(0)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveStudio(studio)
                  setActiveImageIndex(0)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${studio.name}`}
            >
              <Image
                src={studio.images[0].src || "/placeholder.svg"}
                alt={studio.images[0].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={85}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 ease-out group-hover:translate-y-[-8px]">
                <h3 className="text-xl font-bold mb-2">{studio.name}</h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{studio.description}</p>
              </div>

              {/* Logo Watermark */}
              <div
                className="absolute top-4 right-4 w-8 h-8 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/6d5cb651361b0b1fed8b748fa0258f74b8dbdc18/svg/hydra-logo-icon-white.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Studio Details */}
      {activeStudio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveStudio(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-modal-title"
        >
          <div
            ref={modalRef}
            className="bg-[#121212] rounded max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 id="studio-modal-title" className="text-2xl font-bold">
                {activeStudio.name}
              </h3>
              <button
                ref={closeButtonRef}
                className="text-white/70 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                onClick={() => setActiveStudio(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto">
              <div className="relative h-[50vh]">
                <Image
                  src={activeStudio.images[activeImageIndex].src || "/placeholder.svg"}
                  alt={activeStudio.images[activeImageIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={85}
                />
              </div>

              {/* Thumbnails */}
              {activeStudio.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="Studio images">
                  {activeStudio.images.map((image, index) => (
                    <button
                      key={index}
                      className={cn(
                        "relative w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#556B2F]",
                        activeImageIndex === index ? "ring-2 ring-[#556B2F]" : "",
                      )}
                      onClick={() => setActiveImageIndex(index)}
                      role="tab"
                      aria-selected={activeImageIndex === index}
                      aria-controls={`panel-${index}`}
                      id={`tab-${index}`}
                      aria-label={image.alt}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                        quality={75}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Studio Details */}
              <div
                className="p-6"
                role="tabpanel"
                id={`panel-${activeImageIndex}`}
                aria-labelledby={`tab-${activeImageIndex}`}
              >
                <p className="text-lg mb-6">{activeStudio.description}</p>

                <h4 className="text-lg font-medium mb-3">Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {activeStudio.features.map((feature, index) => (
                    <div key={index} className="bg-[#1A1A1A] border border-white/10 rounded p-3 text-center">
                      <span className="text-sm text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    onClick={() => {
                      setActiveStudio(null)
                      // You could add logic to scroll to contact section
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Book This Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
