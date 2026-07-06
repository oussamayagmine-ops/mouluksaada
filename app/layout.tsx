import type { Metadata } from 'next'
import { Reem_Kufi, Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { SiteDataProvider } from '@/lib/firebase-client'
import { getAdminData } from '@/lib/firebase'
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
  description:
    'مطعم ملوك السعادة المصري — تجربة مصرية ملكية بطعم أصيل ولمسة عصرية. اطلب الآن أشهى الأكلات المصرية والحلويات والمشروبات.',
}

export const viewport = {
  themeColor: '#1a1408',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const adminData = await getAdminData()
  const colors = adminData?.colors || {}

  // Build CSS variables from Firebase colors
  const colorVars = Object.entries(colors)
    .map(([k, v]) => `--${k}: ${v}`)
    .join(';')

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${display.variable} ${body.variable} bg-background`}
      style={colorVars ? ({ cssText: `:root { ${colorVars} }` } as any) : undefined}
    >
      <head>
        {colorVars && (
          <style dangerouslySetInnerHTML={{ __html: `:root { ${colorVars} }` }} />
        )}
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteDataProvider initial={adminData || {}}>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </SiteDataProvider>
        </CartProvider>
      </body>
    </html>
  )
}
