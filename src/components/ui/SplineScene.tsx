import { Suspense, lazy, useCallback, useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const appRef = useRef<Application | null>(null)

  const handleLoad = useCallback((app: Application) => {
    appRef.current = app
  }, [])

  useEffect(() => {
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
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={handleLoad} />
    </Suspense>
  )
}
