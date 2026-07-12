import type { Metadata } from 'next'
import { Reem_Kufi, Cairo } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { SiteDataProvider } from '@/lib/firebase-client'
import './globals.css'
const display = Reem_Kufi({ variable: '--font-display', subsets: ['arabic','latin'], weight: ['400','500','600','700'] })
const body = Cairo({ variable: '--font-body', subsets: ['arabic','latin'], weight: ['300','400','500','600','700'] })
export const metadata: Metadata = { title: 'ملوك السعادة المصري | تجربة مصرية ملكية', description: 'مطعم ملوك السعادة المصري' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider><SiteDataProvider initial={{}}>{children}</SiteDataProvider></CartProvider>
      </body>
    </html>
  )
}
EOF~

# firebase-client.tsx
cat > ~/Desktop/site-final/lib/firebase-client.tsx << 'EOF'
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
const FB = { apiKey:"AIzaSyB2-uNjELbEI82X35egJGSTdYWGcY0CrYk", authDomain:"mouluksa3ada.firebaseapp.com", projectId:"mouluksa3ada", storageBucket:"mouluksa3ada.firebasestorage.app", messagingSenderId:"391686891157", appId:"1:391686891157:web:ef4b0cf48ae83c0c851d9c" }
export type SiteData = { menu?:any[]; colors?:Record<string,string>; texts?:Record<string,string>; social?:any; reviews?:any[]; visibility?:any; settings?:any }
const Ctx = createContext<SiteData>({})
export const useSiteData = () => useContext(Ctx)
export function SiteDataProvider({ children, initial }: { children: ReactNode; initial: SiteData }) {
  const [data, setData] = useState<SiteData>(initial||{})
  useEffect(() => {
    let unsub: any = null
    async function init() {
      try {
        const { initializeApp, getApps } = await import('firebase/app')
        const { getFirestore, doc, onSnapshot } = await import('firebase/firestore')
        const app = getApps().length ? getApps()[0] : initializeApp(FB)
        const db = getFirestore(app)
        unsub = onSnapshot(doc(db,'admin','data'), (snap) => {
          if (snap.exists()) {
            const d = snap.data() as SiteData
            setData(d)
            if (d.colors) { const r = document.documentElement; Object.entries(d.colors).forEach(([k,v]) => r.style.setProperty('--'+k, v as string)) }
          }
        }, (e) => console.warn('Firestore:',e.message))
      } catch(e) { console.warn('Firebase:',e) }
    }
    init()
    return () => { if (unsub) unsub() }
  }, [])
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>
}
