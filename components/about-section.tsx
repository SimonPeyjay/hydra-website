"use client"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#556B2F]/5 blur-[150px] transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B08D57]/5 blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">About Hydra</h2>

            <div className="space-y-6 text-white/80">
              <p className="text-lg">
                Hydra is a collective of world-class recording studios founded on a simple principle: to create spaces
                where artistic vision and technical excellence converge.
              </p>

              <p>
                Our studios are more than just rooms with equipment—they're carefully crafted environments designed to
                inspire creativity and capture the perfect sound. Each space has its own unique character, acoustics,
                and equipment selection, allowing artists to find the perfect match for their project.
              </p>

              <blockquote className="border-l-4 border-[#556B2F] pl-4 py-2 my-8 text-xl italic">
                "We built Hydra to be the kind of studio we always wanted to work in—where technical excellence meets
                creative freedom."
              </blockquote>

              <p>
                What sets Hydra apart is our collaborative approach. As a collective, we bring together some of the
                industry's most talented engineers, producers, and studio designers, all united by a passion for
                exceptional sound and a commitment to helping artists realize their vision.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div
            className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-1000 ease-out delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="space-y-4">
              <div className="relative h-[200px] rounded overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Thomas_office.jpg"
                  alt="Thomas Office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative h-[250px] rounded overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/David_studio.jpg"
                  alt="David Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div className="relative h-[280px] rounded overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Andreas_studio3.jpg"
                  alt="Andreas Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative h-[170px] rounded overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/SimonPeyjay/hydra-assets/1b7964c41d43c85752967d0a7e3d5c306ee4cf55/photos/Kitchen.jpg"
                  alt="Kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
