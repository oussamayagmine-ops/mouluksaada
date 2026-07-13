import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_LINK, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/site'
import { useSiteData } from '@/lib/firebase-client'

export function Footer() {
  const { social } = useSiteData()
  const waNumber = social?.whatsapp?.replace(/\s/g,'') || WHATSAPP_NUMBER
  const waMessage = social?.wa_message || WHATSAPP_MESSAGE
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
  const igUrl = social?.ig_url || social?.instagram ? `https://instagram.com/${social.instagram}` : 'https://instagram.com'
  return (
    <footer className="engraved-pattern relative border-t border-gold/25 bg-card/30 py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex max-w-sm flex-col items-center text-center md:items-start md:text-right">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold/40">
                <Image
                  src="/images/logo.webp"
                  alt="شعار ملوك السعادة المصري"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-xl font-semibold text-gold-foil">
                ملوك السعادة المصري
              </span>
            </div>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-foreground/65">
              تجربة مصرية ملكية بطعم أصيل ولمسة عصرية — حيث يلتقي الطعم بالفخامة.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="روابط سريعة">
            <ul className="flex flex-col items-center gap-3 md:items-start">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-foreground/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="font-display text-sm font-semibold text-gold">تابعنا</p>
            <div className="flex gap-3">
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-primary-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-primary-foreground"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-12 h-px w-full" />
        <p className="mt-6 text-center font-sans text-xs text-foreground/50">
          © {new Date().getFullYear()} ملوك السعادة المصري — جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  )
}
