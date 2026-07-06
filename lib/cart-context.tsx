'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type CartCategory = 'food' | 'desserts' | 'drinks'

export type CartItem = {
  name: string
  price: number
  qty: number
  category: CartCategory
}

type AddItemInput = {
  name: string
  price: number
  category: CartCategory
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: AddItemInput) => void
  removeItem: (name: string) => void
  updateQty: (name: string, qty: number) => void
  clearCart: () => void
}

const STORAGE_KEY = 'msa-cart'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  // Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage write errors
    }
  }, [items, hydrated])

  const addItem = useCallback((item: AddItemInput) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.name === item.name)
      if (existing) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p,
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((p) => p.name !== name))
  }, [])

  const updateQty = useCallback((name: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((p) => p.name !== name)
      return prev.map((p) => (p.name === name ? { ...p, qty } : p))
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
