'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_LINK, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/site'
import { useSiteData } from '@/lib/firebase-client'
import { useCart } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'

export function Navbar() {
  const { social, site_images } = useSiteData()
  const logoSrc = site_images?.logo?.stored || '/images/logo.webp'
  const waNumber = social?.whatsapp?.replace(/\s/g,'') || WHATSAPP_NUMBER
  const waMessage = social?.wa_message || WHATSAPP_MESSAGE
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-gold/20 bg-background/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo on the right (first in RTL flow) */}
        <a href="#hero" className="flex items-center gap-3" aria-label="ملوك السعادة المصري">
          <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold/40 md:h-14 md:w-14">
            <Image
              src={logoSrc}
              alt="شعار ملوك السعادة المصري"
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden font-display text-lg font-semibold text-gold-foil sm:block">
            ملوك السعادة
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative font-sans text-sm font-medium text-foreground/85 transition-colors hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCartOpen((v) => !v)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            aria-label="سلة الطلبات"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 font-sans text-[11px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gradient-to-l from-amber-glow to-gold px-6 py-2.5 font-sans text-sm font-bold text-primary-foreground shadow-[0_0_24px_-4px_var(--gold)] transition-all hover:shadow-[0_0_36px_-2px_var(--gold)] hover:brightness-110 sm:block"
          >
            اطلب الآن
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold md:hidden"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-sans text-foreground/85 transition-colors hover:bg-secondary hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-gradient-to-l from-amber-glow to-gold px-6 py-3 text-center font-sans font-bold text-primary-foreground"
              >
                اطلب الآن
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
