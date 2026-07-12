'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const FB_CONFIG = {
  apiKey: "AIzaSyB2-uNjELbEI82X35egJGSTdYWGcY0CrYk",
  authDomain: "mouluksa3ada.firebaseapp.com",
  projectId: "mouluksa3ada",
  storageBucket: "mouluksa3ada.firebasestorage.app",
  messagingSenderId: "391686891157",
  appId: "1:391686891157:web:ef4b0cf48ae83c0c851d9c"
}

export type SiteData = {
  menu?: any[]
  colors?: Record<string, string>
  texts?: Record<string, string>
  social?: {
    whatsapp?: string
    wa_message?: string
    instagram?: string
    ig_url?: string
    facebook?: string
    tiktok?: string
  }
  reviews?: any[]
  visibility?: Record<string, boolean>
  settings?: { name?: string; tagline?: string }
  site_images?: Record<string, any>
}

const SiteDataCtx = createContext<SiteData>({})
export const useSiteData = () => useContext(SiteDataCtx)

export function SiteDataProvider({ children, initial }: { children: ReactNode; initial: SiteData }) {
  const [data, setData] = useState<SiteData>(initial || {})

  useEffect(() => {
    let unsub: (() => void) | null = null

    async function init() {
      try {
        const { initializeApp, getApps } = await import('firebase/app')
        const { getFirestore, doc, onSnapshot } = await import('firebase/firestore')
        
        const app = getApps().length ? getApps()[0] : initializeApp(FB_CONFIG)
        const db = getFirestore(app)

        unsub = onSnapshot(
          doc(db, 'admin', 'data'),
          (snap) => {
            if (snap.exists()) {
              const d = snap.data() as SiteData
              setData(d)
              // Apply colors to DOM immediately — no reload needed
              if (d.colors) {
                const root = document.documentElement
                Object.entries(d.colors).forEach(([k, v]) => {
                  root.style.setProperty('--' + k, v as string)
                })
              }
            }
          },
          (err) => console.warn('[Firebase]', err.message)
        )
      } catch (e) {
        console.warn('[Firebase init]', e)
      }
    }

    init()
    return () => { if (unsub) unsub() }
  }, [])

  return <SiteDataCtx.Provider value={data}>{children}</SiteDataCtx.Provider>
}
