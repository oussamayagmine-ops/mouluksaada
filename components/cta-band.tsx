'use client'

import { MessageCircle } from 'lucide-react'
import { Reveal } from './reveal'
import { WHATSAPP_LINK } from '@/lib/site'

export function CtaBand() {
  return (
    <section className="engraved-pattern relative overflow-hidden border-y border-gold/15 py-28 md:py-36">
      {/* amber glow backdrop */}
      <div className="absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-glow/15 blur-[120px]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <Reveal>
          <h2 className="text-gold-foil font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            اطلب الآن واستمتع بأفضل المأكولات المصرية
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-l from-amber-glow to-gold px-10 py-5 font-sans text-lg font-bold text-primary-foreground shadow-[0_0_40px_-8px_var(--gold)] transition-all hover:scale-[1.04] hover:shadow-[0_0_60px_-6px_var(--gold)]"
          >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/30" />
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            اطلب عبر واتساب
          </a>
        </Reveal>
      </div>
    </section>
  )
}
