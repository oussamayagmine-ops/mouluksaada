'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { ease } from '@/lib/motion'
import { useCart } from '@/lib/cart-context'
import { LocationModal } from './location-modal'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQty, removeItem } = useCart()
  const [locationOpen, setLocationOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm"
            />

            {/* Drawer — slides in from the right (RTL) */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease }}
              className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col border-l border-gold/20 bg-card shadow-[0_0_60px_-10px_rgba(0,0,0,0.8)]"
              role="dialog"
              aria-modal="true"
              aria-label="سلة الطلبات"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gold/15 px-6 py-5">
                <h2 className="text-gold-foil font-display text-xl font-bold">
                  سلة الطلبات
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  aria-label="إغلاق السلة"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <ShoppingBag
                      className="h-12 w-12 text-gold/40"
                      aria-hidden="true"
                    />
                    <p className="font-sans text-base text-foreground/60">
                      سلتك فارغة
                    </p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 rounded-2xl border border-gold/12 bg-background/40 p-3"
                      >
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-foreground/90">
                            {item.name}
                          </p>
                          <p className="mt-1 font-display text-sm font-bold text-gold">
                            {item.price} DH
                          </p>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.name, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                            aria-label={`إنقاص كمية ${item.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center font-sans text-sm font-semibold text-foreground">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.name, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                            aria-label={`زيادة كمية ${item.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="w-16 shrink-0 text-left font-display text-sm font-bold text-foreground/90">
                          {item.price * item.qty} DH
                        </span>

                        <button
                          type="button"
                          onClick={() => removeItem(item.name)}
                          className="grid h-7 w-7 place-items-center rounded-full text-foreground/40 transition-colors hover:text-destructive"
                          aria-label={`حذف ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gold/15 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-sans text-base font-medium text-foreground/80">
                      المجموع
                    </span>
                    <span className="font-display text-2xl font-bold text-gold">
                      {total} DH
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLocationOpen(true)}
                    className="w-full rounded-full bg-gradient-to-l from-amber-glow to-gold px-6 py-3.5 font-sans text-base font-bold text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] transition-all hover:brightness-110"
                  >
                    تأكيد الطلب
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <LocationModal
        open={locationOpen}
        onClose={() => {
          setLocationOpen(false)
          onClose()
        }}
      />
    </>
  )
}
