'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, X } from 'lucide-react'
import { ease } from '@/lib/motion'
import { useCart } from '@/lib/cart-context'
import { WHATSAPP_NUMBER } from '@/lib/site'

type LocationModalProps = {
  open: boolean
  onClose: () => void
}

const CATEGORY_LABELS: Record<string, string> = {
  food: 'الأكلات',
  desserts: 'الحلويات',
  drinks: 'المشروبات',
}

// Order categories: food first, then desserts, then drinks
const CATEGORY_ORDER = ['food', 'desserts', 'drinks'] as const

export function LocationModal({ open, onClose }: LocationModalProps) {
  const { items, clearCart } = useCart()
  const [address, setAddress] = useState('')
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const buildMessage = (locationLine: string) => {
    const lines: string[] = []
    lines.push('السلام عليكم، أريد طلب من مطعم ملوك السعادة المصري')
    lines.push('')

    for (const cat of CATEGORY_ORDER) {
      const catItems = items.filter((i) => i.category === cat)
      if (catItems.length === 0) continue
      lines.push(`*${CATEGORY_LABELS[cat]}:*`)
      for (const item of catItems) {
        lines.push(`• ${item.name} ×${item.qty} — ${item.price * item.qty} DH`)
      }
      lines.push('')
    }

    lines.push(`*المجموع: ${total} DH*`)
    lines.push('')
    lines.push(locationLine)

    return lines.join('\n')
  }

  const sendOrder = (locationLine: string) => {
    const message = buildMessage(locationLine)
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
    )
    clearCart()
    onClose()
  }

  const handleAuto = () => {
    setError('')
    if (!('geolocation' in navigator)) {
      setError('خدمة تحديد الموقع غير متوفرة في متصفحك')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`
        setLocating(false)
        sendOrder(`📍 موقعي: ${mapsUrl}`)
      },
      () => {
        setLocating(false)
        setError('تعذّر تحديد موقعك، يرجى إدخال العنوان يدوياً')
      },
    )
  }

  const handleManual = () => {
    if (!address.trim()) {
      setError('يرجى إدخال عنوانك')
      return
    }
    sendOrder(`📍 العنوان: ${address.trim()}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="تحديد موقع التوصيل"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full max-w-md rounded-3xl border border-gold/25 bg-card p-6 shadow-[0_0_60px_-20px_var(--gold)] md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-gold-foil font-display text-2xl font-bold">
              أين توصّل طلبك؟
            </h3>
            <p className="mt-2 font-sans text-sm font-light text-foreground/70">
              اختر موقعك حتى نتمكن من توصيل طلبك بسرعة
            </p>

            <button
              type="button"
              onClick={handleAuto}
              disabled={locating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-amber-glow to-gold px-6 py-3.5 font-sans text-base font-bold text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] transition-all hover:brightness-110 disabled:opacity-60"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {locating ? 'جارٍ تحديد الموقع…' : 'تحديد موقعي تلقائياً'}
            </button>

            <div className="my-5 flex items-center gap-3">
              <span className="gold-divider h-px flex-1" />
              <span className="font-sans text-xs text-foreground/50">أو</span>
              <span className="gold-divider h-px flex-1" />
            </div>

            <label
              htmlFor="manual-address"
              className="mb-2 block font-sans text-sm font-medium text-foreground/80"
            >
              أدخل عنوانك يدوياً
            </label>
            <textarea
              id="manual-address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                setError('')
              }}
              rows={2}
              placeholder="مثال: حي السلام، شارع 12، رقم 5"
              className="w-full resize-none rounded-2xl border border-gold/25 bg-background/60 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {error && (
              <p className="mt-2 font-sans text-sm text-destructive">{error}</p>
            )}

            <button
              type="button"
              onClick={handleManual}
              className="mt-4 w-full rounded-full border border-gold/50 px-6 py-3 font-sans text-base font-semibold text-gold transition-all hover:bg-gold hover:text-primary-foreground"
            >
              إرسال الطلب عبر واتساب
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
