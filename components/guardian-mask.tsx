'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * Giant semi-transparent glowing Tutankhamun mask that materializes
 * behind the page as the user scrolls — a sacred guardian deity.
 */
function GuardianMaskInner() {
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.4, 0.62, 0.82, 1],
    [0, 0.18, 0.05, 0.2, 0.06, 0],
  )
  const y = useTransform(scrollYProgress, [0, 1], [80, -120])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1.08])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="relative h-[80vh] w-[80vh] max-w-[90vw]"
      >
        <div className="absolute inset-0 rounded-full bg-red-800/20 blur-[120px]" />
        <Image
          src="/images/tutankhamun.png"
          alt=""
          fill
          sizes="80vh"
          className="object-contain mix-blend-screen"
          priority={false}
        />
      </motion.div>
    </div>
  )
}

export const GuardianMask = dynamic(
  () => Promise.resolve(GuardianMaskInner),
  { ssr: false },
)
