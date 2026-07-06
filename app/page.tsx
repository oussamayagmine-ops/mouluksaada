import { Navbar } from '@/components/navbar'
import { GuardianMask } from '@/components/guardian-mask'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { MenuSection } from '@/components/menu-section'
import { FeaturedDishes } from '@/components/featured-dishes'
import { Testimonials } from '@/components/testimonials'
import { CtaBand } from '@/components/cta-band'
import { Footer } from '@/components/footer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'

export default function Page() {
  return (
    <>
      <GuardianMask />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <MenuSection />
        <FeaturedDishes />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
