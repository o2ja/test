// components/Testimonials.jsx
// Section 6 — Animated stacked testimonial cards with drag-to-navigate
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Chromasonic didn\'t just design our brand — they uncovered it. What they delivered felt like something we\'d been searching for for years.',
    name: 'Aria Chen',
    role: 'Founder, Veldt Studio',
    company: 'Veldt',
    avatar: 'AC',
    color: '#FF3C00',
  },
  {
    id: 2,
    quote: 'The motion work they created for our launch campaign was unlike anything in our space. People genuinely stopped scrolling.',
    name: 'Marcus Osei',
    role: 'CMO, Prism Health',
    company: 'Prism',
    avatar: 'MO',
    color: '#8B00FF',
  },
  {
    id: 3,
    quote: 'Working with Chromasonic is a study in controlled chaos. The process feels wild, but the outcome is always precise and inevitable.',
    name: 'Lena Voss',
    role: 'Creative Director, DUSK',
    company: 'DUSK',
    avatar: 'LV',
    color: '#0033FF',
  },
  {
    id: 4,
    quote: 'They have an extraordinary ability to translate emotion into form. Our UI redesign increased engagement by 340% in the first month.',
    name: 'Takeshi Mori',
    role: 'Product Lead, Nōku',
    company: 'Nōku',
    avatar: 'TM',
    color: '#C8FF00',
  },
  {
    id: 5,
    quote: 'The illustration series they produced for us has become our most shared content ever. Pure art that also converts.',
    name: 'Sofia Reyes',
    role: 'Brand Manager, Fiera',
    company: 'Fiera',
    avatar: 'SR',
    color: '#00FFA3',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const active = TESTIMONIALS[current]

  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Large background quote mark */}
      <div
        className="absolute top-16 left-8 font-heading text-[20rem] leading-none pointer-events-none select-none"
        style={{ color: 'rgba(255,255,255,0.02)' }}
        aria-hidden
      >
        "
      </div>

      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'var(--accent)' }}
        >
          ✦ Kind Words
        </motion.p>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="font-display leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--chalk)' }}
          >
            WHAT THEY
            <br />
            <span style={{ color: 'var(--accent)' }}>SAY</span>
          </motion.h2>
        </div>

        {/* Card stack */}
        <div className="relative" style={{ minHeight: 340 }}>
          {/* Ghost cards behind */}
          {[2, 1].map((offset) => {
            const idx = (current + offset) % TESTIMONIALS.length
            const t = TESTIMONIALS[idx]
            return (
              <div
                key={t.id}
                className="absolute inset-x-0 top-0 border border-white/5 p-8 md:p-12"
                style={{
                  transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.03})`,
                  background: 'rgba(255,255,255,0.015)',
                  zIndex: 10 - offset,
                  borderRadius: 2,
                }}
              />
            )
          })}

          {/* Active card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, y: direction * 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: direction * -40, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative border border-white/10 p-8 md:p-12"
              style={{
                background: 'rgba(255,255,255,0.03)',
                zIndex: 20,
                borderRadius: 2,
              }}
            >
              {/* Accent line */}
              <div
                className="w-12 h-0.5 mb-8"
                style={{ background: active.color }}
              />

              {/* Quote */}
              <blockquote
                className="font-heading italic leading-relaxed mb-10"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)',
                  color: 'rgba(245,240,235,0.9)',
                }}
              >
                "{active.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-ink shrink-0"
                  style={{ background: active.color, fontSize: '0.85rem', letterSpacing: '0.05em' }}
                >
                  {active.avatar}
                </div>
                <div>
                  <p className="font-body font-medium text-chalk">{active.name}</p>
                  <p className="font-mono text-xs tracking-widest text-chalk/40 mt-0.5">{active.role}</p>
                </div>

                {/* Company tag */}
                <div className="ml-auto hidden sm:block">
                  <span
                    className="font-mono text-xs tracking-[0.25em] uppercase px-3 py-1 border"
                    style={{ borderColor: `${active.color}40`, color: active.color }}
                  >
                    {active.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {/* Dot indicators */}
          <div className="flex gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="w-2 h-2 rounded-full transition-all duration-400"
                style={{
                  background: i === current ? active.color : 'rgba(255,255,255,0.15)',
                  transform: i === current ? 'scale(1.4)' : 'scale(1)',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            {[
              { dir: -1, label: '←', aria: 'Previous' },
              { dir: 1, label: '→', aria: 'Next' },
            ].map(({ dir, label, aria }) => (
              <button
                key={dir}
                onClick={() => go(dir)}
                className="w-12 h-12 border border-white/15 flex items-center justify-center font-body text-chalk/60 hover:text-chalk hover:border-white/40 transition-all duration-300"
                aria-label={aria}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Client logos row */}
        <div className="mt-20 pt-10 border-t border-white/6">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-chalk/25 mb-8 text-center">
            Trusted by forward-thinking teams
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Veldt', 'Prism', 'DUSK', 'Nōku', 'Fiera', 'Atmos'].map((co) => (
              <motion.span
                key={co}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display tracking-widest text-chalk/20 hover:text-chalk/50 transition-colors duration-300 cursor-default"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
              >
                {co}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
