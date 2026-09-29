import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Journey } from '@/components/sections/Journey'
import { Topics } from '@/components/sections/Topics'
import { Showcase } from '@/components/sections/Showcase'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'
import { Reveal } from '@/components/Reveal'

export default function Page() {
  return (
    <div className="bg-surface text-text min-h-screen overflow-hidden">
      <Header />
      <main id="konten">
        <Reveal>
          <Hero />
          <Features />
          <Journey />
          <Topics />
          <Showcase />
          <Testimonials />
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
