'use client'

import { useEffect, useRef } from 'react'

type GoldParticlesProps = {
  count?: number
  className?: string
}

export function GoldParticles({ count = 40, className }: GoldParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; r: number; s: number; o: number; tw: number }
    let particles: P[] = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const actualCount = window.innerWidth < 768 ? Math.floor(count / 2) : count
      particles = Array.from({ length: actualCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        s: Math.random() * 0.4 + 0.15,
        o: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y -= p.s
        p.tw += 0.02
        if (p.y < -5) {
          p.y = h + 5
          p.x = Math.random() * w
        }
        const flicker = (Math.sin(p.tw) + 1) / 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 40, 40, ${p.o * (0.4 + flicker * 0.6)})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(220, 40, 40, 0.8)'
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) draw()
    else {
      // single static render
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 40, 40, ${p.o})`
        ctx.fill()
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', willChange: 'transform' }}
    />
  )
}
