import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import bodyUrl from '../assets/figure-body.png'
import headUrl from '../assets/figure-head.png'

interface InteractiveFigureProps {
  alt: string
}

/**
 * The figure is cut into two transparent layers (head + body). Each layer
 * tracks the mouse on its own spring, so the head looks around independently
 * of the torso — a 2.5D puppet rather than a rigid whole-block tilt.
 * The head is a child of the body group (parent-child rig) so the neck stays
 * connected while the head adds its own faster, wider sway.
 */
export default function InteractiveFigure({ alt }: InteractiveFigureProps) {
  const [reduced, setReduced] = useState(false)

  const px = useMotionValue(0) // -0.5 .. 0.5 across viewport
  const py = useMotionValue(0)

  // body: slow, heavy
  const bx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.8 })
  const by = useSpring(py, { stiffness: 90, damping: 20, mass: 0.8 })
  // head: snappier + wider -> clearly independent
  const hx = useSpring(px, { stiffness: 260, damping: 14, mass: 0.35 })
  const hy = useSpring(py, { stiffness: 260, damping: 14, mass: 0.35 })

  const bodyRotY = useTransform(bx, [-0.5, 0.5], [8, -8])
  const bodyRotX = useTransform(by, [-0.5, 0.5], [-5, 5])
  const bodyX = useTransform(bx, [-0.5, 0.5], [-12, 12])
  const bodyY = useTransform(by, [-0.5, 0.5], [-7, 7])

  const headRotY = useTransform(hx, [-0.5, 0.5], [16, -16])
  const headRotX = useTransform(hy, [-0.5, 0.5], [-11, 11])
  const headX = useTransform(hx, [-0.5, 0.5], [-10, 10])
  const headY = useTransform(hy, [-0.5, 0.5], [-6, 6])

  const glowX = useTransform(bx, [-0.5, 0.5], [20, -20])
  const glowY = useTransform(by, [-0.5, 0.5], [14, -14])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) return

    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [px, py])

  const imgBox = 'block h-[68vh] max-h-[560px] w-auto select-none'

  if (reduced) {
    return (
      <div className="relative flex items-end justify-center">
        <div className="absolute bottom-16 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative z-10">
          <img src={bodyUrl} alt={alt} className={imgBox} draggable={false} />
          <img
            src={headUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative flex items-end justify-center"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute bottom-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
        style={{ x: glowX, y: glowY }}
      />

      {/* gentle idle breathing so it feels alive even without mouse motion */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        className="relative z-10"
      >
        {/* body group — slow mouse sway */}
        <motion.div
          className="relative"
          style={{
            rotateY: bodyRotY,
            rotateX: bodyRotX,
            x: bodyX,
            y: bodyY,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 100%',
          }}
        >
          <img src={bodyUrl} alt={alt} className={imgBox} draggable={false} />

          {/* head layer — independent, faster, wider sway; pivots at the neck */}
          <motion.img
            src={headUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
            style={{
              rotateY: headRotY,
              rotateX: headRotX,
              x: headX,
              y: headY,
              transformOrigin: '50% 24%',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
