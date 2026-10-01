import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  poster: string
  className?: string
}

// Phones (no cursor to follow) and Data Saver users only get the still poster,
// which avoids downloading ~2 MB of Spline runtime plus the scene file.
const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { connection?: { saveData?: boolean } }) : undefined
const skip3D =
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 767px)').matches || nav?.connection?.saveData === true)

// Start downloading the Spline runtime as soon as this module loads,
// instead of waiting for the hero to mount.
const splineImport = skip3D ? null : import('@splinetool/react-spline')
const Spline = lazy(() => splineImport ?? new Promise<never>(() => {}))

export function SplineScene({ scene, poster, className }: SplineSceneProps) {
  const appRef = useRef<Application | null>(null)
  const [ready, setReady] = useState(false)

  const handleLoad = useCallback((app: Application) => {
    appRef.current = app
    setReady(true)
  }, [])

  useEffect(() => {
    if (skip3D) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const forwardToCanvas = (e: PointerEvent) => {
      if ((e as PointerEvent & { __forwarded?: boolean }).__forwarded) return

      const canvas = appRef.current?.canvas
      if (!canvas || e.target === canvas) return

      const forwarded = new PointerEvent('pointermove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
        pointerId: e.pointerId,
        pointerType: e.pointerType || 'mouse',
      })
      ;(forwarded as PointerEvent & { __forwarded?: boolean }).__forwarded = true
      canvas.dispatchEvent(forwarded)
    }

    window.addEventListener('pointermove', forwardToCanvas)
    return () => window.removeEventListener('pointermove', forwardToCanvas)
  }, [])

  return (
    <div className="relative h-full w-full">
      {/* Lightweight still of the robot: visible instantly, fades out once the live scene is ready. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {!skip3D && (
        <Suspense fallback={null}>
          <Spline scene={scene} className={className} onLoad={handleLoad} />
        </Suspense>
      )}
    </div>
  )
}
