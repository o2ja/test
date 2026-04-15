// components/CustomCursor.jsx
// Dual-element cursor with dot + ring, blend mode difference
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth ring follow
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Hover states on interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    const enter = () => {
      dot.classList.add('cursor--hover')
      ring.classList.add('cursor-ring--hover')
    }
    const leave = () => {
      dot.classList.remove('cursor--hover')
      ring.classList.remove('cursor-ring--hover')
    }

    document.addEventListener('mousemove', handleMove)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)' }} />
      <div ref={ringRef} className="cursor-ring" style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)' }} />
    </>
  )
}
