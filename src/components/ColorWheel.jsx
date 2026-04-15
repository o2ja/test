// components/ColorWheel.jsx
// Option A: Floating draggable color wheel
// Picking a hue updates --accent and --accent-rgb CSS variables site-wide
import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const PRESET_COLORS = [
  { name: 'Ember', hex: '#FF3C00', rgb: '255,60,0' },
  { name: 'Acid', hex: '#C8FF00', rgb: '200,255,0' },
  { name: 'Cobalt', hex: '#0033FF', rgb: '0,51,255' },
  { name: 'Violet', hex: '#8B00FF', rgb: '139,0,255' },
  { name: 'Mint', hex: '#00FFA3', rgb: '0,255,163' },
  { name: 'Coral', hex: '#FF6B6B', rgb: '255,107,107' },
  { name: 'Gold', hex: '#FFD700', rgb: '255,215,0' },
  { name: 'Pink', hex: '#FF2D78', rgb: '255,45,120' },
]

function setAccentColor(hex, rgb) {
  document.documentElement.style.setProperty('--accent', hex)
  document.documentElement.style.setProperty('--accent-rgb', rgb)
}

export default function ColorWheel() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(PRESET_COLORS[0])
  const [minimized, setMinimized] = useState(false)
  const constraintsRef = useRef(null)

  const handlePick = useCallback((color) => {
    setActive(color)
    setAccentColor(color.hex, color.rgb)
  }, [])

  return (
    <>
      {/* Full-screen drag constraint */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-[9500]"
      />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.8, x: 'calc(100vw - 120px)', y: 'calc(100vh - 200px)' }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed z-[9500] select-none"
        style={{ touchAction: 'none' }}
      >
        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center font-display text-ink text-xs shadow-2xl cursor-grab active:cursor-grabbing"
          style={{
            background: `conic-gradient(#FF3C00, #FFD700, #C8FF00, #00FFA3, #0033FF, #8B00FF, #FF2D78, #FF3C00)`,
            boxShadow: `0 0 30px ${active.hex}80`,
          }}
          aria-label="Open color picker"
          data-cursor
        >
          <span className="absolute inset-[3px] rounded-full bg-ink flex items-center justify-center">
            <span className="w-5 h-5 rounded-full" style={{ background: active.hex }} />
          </span>
        </motion.button>

        {/* Color swatches panel */}
        <motion.div
          initial={false}
          animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-full mb-3 right-0 p-3 border border-white/10 pointer-events-auto"
          style={{
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(20px)',
            pointerEvents: open ? 'auto' : 'none',
            minWidth: 200,
          }}
        >
          <p className="font-mono text-[10px] tracking-widest uppercase text-chalk/30 mb-3 px-1">
            Accent Color
          </p>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((color) => (
              <motion.button
                key={color.name}
                onClick={() => handlePick(color)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-1"
                aria-label={color.name}
                data-cursor
              >
                <div
                  className="w-9 h-9 rounded-full transition-all duration-200"
                  style={{
                    background: color.hex,
                    boxShadow: active.hex === color.hex ? `0 0 14px ${color.hex}` : 'none',
                    border: active.hex === color.hex ? `2px solid white` : '2px solid transparent',
                  }}
                />
                <span className="font-mono text-[8px] tracking-widest text-chalk/30">
                  {color.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Custom hex input */}
          <div className="mt-3 pt-3 border-t border-white/8 flex gap-2">
            <input
              type="color"
              defaultValue={active.hex}
              onChange={(e) => {
                const hex = e.target.value
                // Convert hex to rgb
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                handlePick({ name: 'Custom', hex, rgb: `${r},${g},${b}` })
              }}
              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              style={{ padding: '1px' }}
            />
            <span className="font-mono text-xs text-chalk/30 self-center tracking-wider">Custom</span>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
