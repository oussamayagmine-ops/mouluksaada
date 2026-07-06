'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { GoldParticles } from './gold-particles'
import { WHATSAPP_LINK } from '@/lib/site'
import { ease } from '@/lib/motion'

export function Hero() {
  return (
    <section
      id="hero"
      className="film-grain relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="أجواء مطعم ملوك السعادة المصري"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />
        {/* Warm amber bloom from center */}
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-glow/25 blur-[140px]" />
      </div>

      <GoldParticles count={48} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/30 px-5 py-2 font-sans text-xs font-medium tracking-wide text-gold backdrop-blur-sm"
        >
          مطعم مصري ملكي · طعم أصيل
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease, delay: 0.35 }}
          className="text-gold-foil shimmer-sweep font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl"
        >
          ملوك السعادة المصري
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.7 }}
          className="mt-7 max-w-xl font-sans text-base font-light leading-relaxed text-foreground/80 text-pretty sm:text-lg"
        >
          تجربة مصرية ملكية بطعم أصيل ولمسة عصرية
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.95 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full bg-gradient-to-l from-amber-glow to-gold px-9 py-4 font-sans text-base font-bold text-primary-foreground shadow-[0_0_30px_-6px_var(--gold)] transition-all hover:scale-[1.03] hover:shadow-[0_0_46px_-4px_var(--gold)]"
          >
            <span className="absolute inset-0 animate-pulse bg-gold/0 group-hover:bg-gold/10" />
            اطلب الآن
          </a>
          <a
            href="#menu"
            className="rounded-full border border-gold/50 px-9 py-4 font-sans text-base font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            شاهد المنيو
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-gold/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
