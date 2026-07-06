'use client'
import { Star } from 'lucide-react'
import { Reveal } from './reveal'
import { useSiteData } from '@/lib/firebase-client'

const DEFAULT_TESTIMONIALS = [
  { name: 'أحمد المنصوري', text: 'أفضل كشري تذوقته على الإطلاق! الطعم أصيل والأجواء راقية جدًا. تجربة ملكية بكل معنى الكلمة.', stars: 5 },
  { name: 'سارة بنعلي', text: 'الشاورما المصرية هنا لا تُضاهى، والخدمة سريعة والتقديم أنيق. صرتُ من الزبائن الدائمين.', stars: 5 },
  { name: 'يوسف العلوي', text: 'طبق الميكس وليمة حقيقية! جودة عالية وأسعار مناسبة. ملوك السعادة فعلاً ملوك الطعم.', stars: 5 },
  { name: 'ليلى قاسمي', text: 'الحلويات خيالية، خاصة الرومانسية لوتس. مكان يستحق الزيارة مرارًا وتكرارًا.', stars: 5 },
]

export function Testimonials() {
  const { reviews } = useSiteData()
  const list = (reviews && reviews.length > 0)
    ? reviews.filter((r: any) => r.visible !== false)
    : DEFAULT_TESTIMONIALS

  return (
    <section id="testimonials" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-16 text-center">
          <p className="mb-4 font-sans text-sm font-semibold tracking-widest text-gold">شهادات</p>
          <h2 className="text-gold-foil font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            آراء عملائنا
          </h2>
          <div className="gold-divider mx-auto mt-7 h-px w-40" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((t: any, i: number) => (
            <Reveal key={t.name + i} delay={i * 0.1}>
              <figure className="relative h-full overflow-hidden rounded-3xl border border-gold/15 bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_-14px_var(--gold)]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-glow/10 blur-2xl" />
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.stars || 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-sans text-lg font-light leading-relaxed text-foreground/85 text-pretty">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 font-display text-base font-semibold text-gold">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
