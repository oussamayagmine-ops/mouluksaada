import type { Metadata } from 'next'
import { Reem_Kufi, Cairo } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { SiteDataProvider } from '@/lib/firebase-client'
import './globals.css'

const display = Reem_Kufi({
  variable: '--font-display',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

const body = Cairo({
  variable: '--font-body',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ملوك السعادة المصري | تجربة مصرية ملكية',
  description: 'مطعم ملوك السعادة المصري — تجربة مصرية ملكية بطعم أصيل ولمسة عصرية.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteDataProvider initial={{}}>
            {children}
          </SiteDataProvider>
        </CartProvider>
      </body>
    </html>
  )
}
