import { setRequestLocale } from "next-intl/server"
import HeroSection from "@/components/hero-section"
import MarqueeBanner from "@/components/marquee-banner"
import StudioGallery from "@/components/studio-gallery"
import AboutSection from "@/components/about-section"
import TeamSection from "@/components/team-section"
import ServicesSection from "@/components/services-section"
import MusicSection from "@/components/music-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-ink text-bone overflow-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <StudioGallery />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <MusicSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
