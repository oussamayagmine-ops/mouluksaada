'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, Utensils } from 'lucide-react'
import { MENU } from '@/lib/menu'
import { useSiteData } from '@/lib/firebase-client'
import { useCart, type CartCategory } from '@/lib/cart-context'
import { Reveal } from './reveal'
import { ease } from '@/lib/motion'

export function MenuSection() {
  const { menu: fbMenu } = useSiteData()
  const data = (fbMenu && fbMenu.length > 0) ? fbMenu : MENU
  const [active, setActive] = useState(data[0]?.id ?? '')
  const category = data.find((c: any) => c.id === active) ?? data[0]
  const { addItem } = useCart()

  return (
    <section id="menu" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="text-center">
          <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-gold">
            قائمتنا الملكية
          </p>
          <h2 className="text-gold-foil font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            المنيو
          </h2>
          <div className="gold-divider mx-auto mt-7 h-px w-40" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-gold/15 bg-card/40 p-1.5 backdrop-blur-sm">
            {data.map((cat: any) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className="relative flex-1 whitespace-nowrap rounded-full px-5 py-3 font-sans text-sm font-semibold transition-colors"
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="menu-tab"
                    transition={{ duration: 0.5, ease }}
                    className="absolute inset-0 rounded-full bg-gradient-to-l from-amber-glow to-gold shadow-[0_0_22px_-6px_var(--gold)]"
                  />
                )}
                <span className={`relative z-10 ${active === cat.id ? 'text-primary-foreground' : 'text-foreground/70'}`}>
                  {cat.icon || ''} {cat.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category?.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease }}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
          >
            {category?.items?.map((item: any, i: number) => (
              <motion.div
                key={`${item.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gold/12 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-card/70 hover:shadow-[0_0_30px_-10px_var(--gold)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary/60">
                      <Utensils className="h-8 w-8 text-gold/60" aria-hidden="true" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-sans text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-gold md:text-base">
                      {item.name}
                    </span>
                    <span className="shrink-0 font-display text-lg font-bold text-gold">
                      {item.price}
                      <span className="mr-1 text-xs font-normal text-foreground/50">DH</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem({ name: item.name, price: Number(item.price), category: category.id as CartCategory })}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-sans text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    أضف
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
