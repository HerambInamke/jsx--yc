import { useRef, useEffect } from 'react'

export function useSmoothScroll({ threshold = 0.1, behavior = 'smooth' } = {}) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const handleWheel = (e) => {
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