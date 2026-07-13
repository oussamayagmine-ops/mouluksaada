'use client'
import { useSiteData } from '@/lib/firebase-client'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/site'

export function CtaBand() {
  const { social } = useSiteData()
  const number = social?.whatsapp?.replace(/\s/g,'') || WHATSAPP_NUMBER
  const message = social?.wa_message || WHATSAPP_MESSAGE
  const link = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-l from-amber-glow/20 via-card/60 to-amber-glow/20" />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-gold">اطلب الآن</p>
        <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
          جرّب الطعم الملكي
          <span className="block text-gold">اليوم</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-sans text-base text-foreground/70">
          تجربة مصرية أصيلة تجمع بين الأكلات الشعبية الأصيلة والإبداع العصري في كل طبق.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-l from-amber-glow to-gold px-10 py-4 font-sans text-base font-bold text-primary-foreground shadow-[0_0_30px_-6px_var(--gold)] transition-all hover:scale-[1.04] hover:shadow-[0_0_46px_-4px_var(--gold)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
          </svg>
          اطلب عبر واتساب
        </a>
      </div>
    </section>
  )
}
