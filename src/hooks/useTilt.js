// hooks/useTilt.js
// Tracks mouse position over card and applies perspective tilt
import { useRef, useEffect } from 'react'

export default function useTilt(maxAngle = 12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -maxAngle
      const rotY = ((x - cx) / cx) * maxAngle
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`
    }

    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
    }

    const handleEnter = () => {
      el.style.transition = 'transform 0.1s ease'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    el.addEventListener('mouseenter', handleEnter)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      el.removeEventListener('mouseenter', handleEnter)
    }
  }, [maxAngle])

  return ref
}
