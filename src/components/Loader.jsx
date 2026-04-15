// components/Loader.jsx
// Full-screen animated loader that counts to 100 then exits
import { useEffect, useRef, useState } from 'react'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 900)
        }, 300)
      } else {
        setProgress(Math.floor(current))
      }
    }, 60)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      ref={loaderRef}
      className={`loader ${exiting ? 'done' : ''}`}
      aria-label="Loading"
    >
      {/* Logo animation */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="overflow-visible">
          <circle
            cx="36" cy="36" r="28"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="175"
            strokeDashoffset={175 - (175 * progress) / 100}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <text
            x="36" y="42"
            textAnchor="middle"
            fill="var(--chalk)"
            fontSize="18"
            fontFamily="'Bebas Neue', sans-serif"
            letterSpacing="2"
            style={{ opacity: progress > 30 ? 1 : 0, transition: 'opacity 0.4s ease' }}
          >
            CS
          </text>
        </svg>

        {/* Brand name */}
        <div
          className="font-display text-3xl tracking-[0.3em] text-chalk"
          style={{ opacity: progress > 20 ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          CHROMASONIC
        </div>

        {/* Counter */}
        <div className="font-mono text-sm tracking-widest" style={{ color: 'var(--accent)' }}>
          {String(Math.floor(progress)).padStart(3, '0')}
        </div>
      </div>

      {/* Progress bar */}
      <div className="loader-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
