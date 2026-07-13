'use client'
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
import { useSiteData } from '@/lib/firebase-client'

export default function Page() {
  const { visibility } = useSiteData()

  const show = (key: string) => visibility ? visibility[key] !== false : true

  return (
    <>
      <GuardianMask />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {show('about') && <About />}
        {show('menu') && <MenuSection />}
        {show('featured') && <FeaturedDishes />}
        {show('reviews') && <Testimonials />}
        {show('cta') && <CtaBand />}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
