'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
import { MENU } from './menu'
import { WHATSAPP_NUMBER } from './site'

const firebaseConfig = {
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
  social?: { whatsapp?: string; wa_message?: string }
  reviews?: any[]
  visibility?: Record<string, boolean>
  settings?: { name?: string; tagline?: string }
}

const SiteDataContext = createContext<SiteData>({})

export function useSiteData() {
  return useContext(SiteDataContext)
}

export function SiteDataProvider({ children, initial }: { children: ReactNode; initial: SiteData }) {
  const [data, setData] = useState<SiteData>(initial || {})

  useEffect(() => {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const unsub = onSnapshot(doc(db, 'admin', 'data'), (snap) => {
      if (snap.exists()) {
        setData(snap.data() as SiteData)
      }
    }, (err) => {
      console.warn('Firestore error:', err)
    })
    return () => unsub()
  }, [])

  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  )
}
