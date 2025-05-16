import HeroSection from "@/components/hero-section"
import StudioGallery from "@/components/studio-gallery"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <StudioGallery />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
