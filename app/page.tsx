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
import { Intro } from '@/components/Intro'

import { FAQ } from '@/components/sections/FAQ'

export default function Page() {
  return (
    <div className="bg-surface text-text min-h-screen overflow-hidden">
      <Intro />
      <Header />
      <main id="konten">
        <Reveal>
          <Hero />
          <Features />
          <Journey />
          <Topics />
          <Showcase />
          <FAQ />
          <Testimonials />
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
