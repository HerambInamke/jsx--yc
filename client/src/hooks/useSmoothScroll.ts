import { useRef, useEffect } from 'react'

interface UseSmoothScrollOptions {
  threshold?: number
  behavior?: ScrollBehavior
}

export function useSmoothScroll<T extends HTMLElement>({
  threshold = 0.1,
  behavior = 'smooth',
}: UseSmoothScrollOptions = {}) {
  const scrollRef = useRef<T>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaY)
      const scrollAmount = Math.max(delta * threshold, 50)
      
      element.scrollBy({
        left: Math.sign(e.deltaY) * scrollAmount,
        behavior,
      })
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    return () => element.removeEventListener('wheel', handleWheel)
  }, [threshold, behavior])

  return scrollRef
}