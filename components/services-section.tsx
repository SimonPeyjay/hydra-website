"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Mic, Sliders, Music, Headphones, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

type Service = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  image: string
}

const services: Service[] = [
  {
    id: "recording",
    title: "Recording",
    description:
      "State-of-the-art recording facilities with premium microphones, preamps, and acoustically-treated spaces designed to capture your sound with exceptional clarity and character.",
    icon: <Mic className="w-6 h-6" />,
    features: [
      "Multiple live rooms and isolation booths",
      "Vintage and modern microphone collection",
      "Premium analog signal chains",
      "High-resolution digital recording",
    ],
    image:
      "/images/photos/Andreas_studio.webp",
  },
  {
    id: "mixing",
    title: "Mixing",
    description:
      "Expert mixing services in acoustically-optimized environments, utilizing both vintage analog gear and cutting-edge digital tools to bring your vision to life.",
    icon: <Sliders className="w-6 h-6" />,
    features: [
      "Analog and digital hybrid mixing",
      "Precision monitoring environments",
      "Extensive outboard gear collection",
      "Remote mixing options available",
    ],
    image:
      "/images/photos/Dennis_studio.webp",
  },
  {
    id: "production",
    title: "Production",
    description:
      "Full-service music production from concept to completion, with access to our network of world-class producers, musicians, and creative collaborators.",
    icon: <Music className="w-6 h-6" />,
    features: [
      "Arrangement and composition",
      "Session musicians coordination",
      "Vintage and modern instrument collection",
      "Creative direction and development",
    ],
    image:
      "/images/photos/David_studio2.webp",
  },
  {
    id: "mastering",
    title: "Mastering",
    description:
      "Precision mastering services in a dedicated environment with specialized equipment and experienced engineers to give your music its final polish.",
    icon: <Headphones className="w-6 h-6" />,
    features: [
      "Dedicated mastering suites",
      "Analog and digital processing",
      "Reference-grade monitoring",
      "Format-specific optimization",
    ],
    image:
      "/images/photos/Peter_studio.webp",
  },
  {
    id: "collaboration",
    title: "Artist Collaboration",
    description:
      "Connect with other artists, producers, and musicians in our creative community. Hydra is more than studios—it's a collective of creative professionals.",
    icon: <Users className="w-6 h-6" />,
    features: ["Networking events", "Collaborative workspaces", "Cross-project opportunities", "Community resources"],
    image:
      "/images/photos/Kitchen.webp",
  },
  {
    id: "residency",
    title: "Studio Residency",
    description:
      "Long-term studio access for artists and producers looking for a creative home base with all the technical resources needed for extended projects.",
    icon: <Calendar className="w-6 h-6" />,
    features: ["Flexible booking arrangements", "Dedicated storage space", "24/7 access options", "Preferential rates"],
    image:
      "/images/photos/Hallway.webp",
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<Service>(services[0])
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="services" className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Our Services</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From recording and mixing to production and mastering, we offer a complete suite of services to bring your
            musical vision to life.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300",
                  activeService.id === service.id
                    ? "bg-gradient-to-r from-[#556B2F] to-[#657d38] text-white shadow-[0_0_15px_rgba(85,107,47,0.3)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setActiveService(service)}
              >
                <span className="flex items-center gap-2">
                  {service.icon}
                  <span>{service.title}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Service Details */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-bold mb-4">{activeService.title}</h3>
              <p className="text-white/80 mb-6">{activeService.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {activeService.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="text-[#556B2F] mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-[#556B2F] to-[#657d38] hover:from-[#657d38] hover:to-[#758e49] text-white px-6 py-3 rounded shadow-[0_0_15px_rgba(85,107,47,0.3)] hover:shadow-[0_0_20px_rgba(85,107,47,0.5)] text-sm uppercase tracking-wider font-medium transition-colors">
                Learn More
              </button>
            </div>

            {/* Service Image */}
            <div className="order-1 lg:order-2">
              <div className="relative h-[300px] md:h-[400px] rounded overflow-hidden">
                <Image
                  src={activeService.image || "/placeholder.svg"}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#556B2F] p-2 rounded-full">{activeService.icon}</div>
                    <h4 className="text-xl font-bold">{activeService.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
