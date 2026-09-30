import type { Metadata } from "next"

// Rendered for notFound() and exported as /404/ (ErrorDocument in public/.htaccess).
export const metadata: Metadata = {
  title: "404 | Hydra Studios",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-white/70 mb-8">Sidan finns inte. / This page could not be found.</p>
        <a href="/" className="underline hover:text-white/80">
          Hydra Studios
        </a>
      </div>
    </main>
  )
}
