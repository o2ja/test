// hooks/useInView.js
// Adds 'in-view' class when element enters viewport
import { useEffect, useRef } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (!options.repeat) observer.unobserve(entry.target)
          } else if (options.repeat) {
            entry.target.classList.remove('in-view')
          }
        })
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
