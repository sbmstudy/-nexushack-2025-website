import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Themes } from "@/components/themes"
import { Schedule } from "@/components/schedule"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <Stats />
      <Themes />
      <Schedule />
      <FAQ />
      <Footer />
    </main>
  )
}
