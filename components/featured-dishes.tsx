'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { WHATSAPP_LINK } from '@/lib/site'
import { Reveal } from './reveal'

const FEATURED = [
  {
    name: 'طبق ميكس ملوك السعادة',
    desc: 'وليمة ملكية تجمع أشهى أطباقنا في طبقٍ واحد — تشكيلة لا تُقاوم لمحبي التميّز.',
    img: '/images/dish-mix.png',
  },
  {
    name: 'كشري مصري أصيل',
    desc: 'سرّ الشوارع المصرية بنكهةٍ متوازنة من الأرز والعدس والمكرونة وصلصةٍ بطعمٍ لا يُنسى.',
    img: '/images/dish-koshari.png',
  },
  {
    name: 'طبق شاورما مصري',
    desc: 'شاورما دجاج ذهبية مشوية بعنايةٍ مع الفريت وصلصة الثوم — متعةٌ في كل قضمة.',
    img: '/images/dish-shawarma.png',
  },
]

function FeaturedRow({
  dish,
  index,
  scrollYProgress,
}: {
  dish: (typeof FEATURED)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const reversed = index % 2 === 1

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <motion.div
        style={{ y: imgY }}
        className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] ${
          reversed ? 'md:order-2' : ''
        }`}
      >
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </motion.div>

      <Reveal className={reversed ? 'md:order-1' : ''}>
        <h3 className="text-gold-foil font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
          {dish.name}
        </h3>
        <p className="mt-5 max-w-md font-sans text-lg font-light leading-relaxed text-foreground/75 text-pretty">
          {dish.desc}
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex items-center gap-2 font-sans text-base font-semibold text-gold"
        >
          اطلب الآن
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
        </a>
      </Reveal>
    </div>
  )
}

export function FeaturedDishes() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      id="featured"
      className="relative overflow-hidden border-y border-gold/10 py-28 md:py-40"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-20 text-center">
          <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-gold">
            من مطبخنا
          </p>
          <h2 className="text-gold-foil font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            الأطباق المميزة
          </h2>
          <div className="gold-divider mx-auto mt-7 h-px w-40" />
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {FEATURED.map((dish, i) => (
            <FeaturedRow
              key={dish.name}
              dish={dish}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
