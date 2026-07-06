'use client'

import { motion } from 'motion/react'
import { Reveal } from './reveal'
import { ease } from '@/lib/motion'

const lines = [
  'وُلدت ملوك السعادة من شغفٍ بالمطبخ المصري الأصيل،',
  'حيث يلتقي عبق الشوارع المصرية العريقة بلمسةٍ عصرية راقية.',
  'نحوّل كل طبقٍ إلى تجربةٍ ملكية — من الكشري إلى الشاورما،',
  'بمكوناتٍ منتقاة وروحٍ تحمل دفء البيت المصري.',
]

export function About() {
  return (
    <section
      id="about"
      className="engraved-pattern relative overflow-hidden border-y border-gold/10 py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        {/* Heading side */}
        <Reveal>
          <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-gold">
            قصتنا
          </p>
          <h2 className="text-gold-foil font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            حكايةُ طعمٍ
            <br />
            بنكهةِ الملوك
          </h2>
          <div className="gold-divider mt-8 h-px w-40" />
        </Reveal>

        {/* Paragraph side — line by line reveal */}
        <div className="space-y-3">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.15 }}
              className="font-sans text-lg font-light leading-relaxed text-foreground/80 text-pretty md:text-xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
