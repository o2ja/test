// components/Hero.jsx
// Full-screen hero — WRECK + FUEGO aesthetic fusion
// Split-text stagger, moving gradient background, abstract shapes, magnetic CTA
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic'

/* ── Split text helper ── */
function SplitText({ text, className, delay = 0, el: Tag = 'span' }) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.035,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block', marginRight: char === ' ' ? '0.25em' : '0' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}

/* ── Floating abstract shape ── */
function Shape({ color, size, x, y, delay, shape = 'circle' }) {
  const variants = {
    float: {
      y: [0, -30, 0],
      rotate: [0, 15, -10, 0],
      transition: { duration: 6 + delay * 2, ease: 'easeInOut', repeat: Infinity, delay },
    },
  }
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate="float"
      variants={variants}
    >
      {shape === 'circle' && (
        <div
          className="w-full h-full rounded-full mix-blend-screen"
          style={{ background: color, opacity: 0.35, filter: 'blur(2px)' }}
        />
      )}
      {shape === 'triangle' && (
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ opacity: 0.3 }}>
          <polygon points="50,5 95,90 5,90" fill={color} />
        </svg>
      )}
      {shape === 'ring' && (
        <div
          className="w-full h-full rounded-full"
          style={{ border: `2px solid ${color}`, opacity: 0.4 }}
        />
      )}
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const gradRef = useRef(null)
  const ctaRef = useMagnetic(0.5)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Delay start for loader to finish
    const t = setTimeout(() => setStarted(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Mouse-following gradient
  useEffect(() => {
    const container = containerRef.current
    const grad = gradRef.current
    if (!container || !grad) return

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e
      const { width, height } = container.getBoundingClientRect()
      const px = (x / width) * 100
      const py = (y / height) * 100
      grad.style.background = `radial-gradient(ellipse 70% 70% at ${px}% ${py}%, rgba(255,60,0,0.22) 0%, rgba(139,0,255,0.12) 40%, transparent 70%)`
    }

    container.addEventListener('mousemove', handleMove)
    return () => container.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-start px-6 md:px-16 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Mouse-following gradient layer */}
      <div
        ref={gradRef}
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 30% 40%, rgba(255,60,0,0.18) 0%, rgba(139,0,255,0.1) 40%, transparent 70%)' }}
      />

      {/* Animated background shapes */}
      <Shape color="var(--ember)" size="180px" x="65%" y="10%" delay={0} shape="circle" />
      <Shape color="var(--acid)" size="80px" x="80%" y="55%" delay={1.2} shape="triangle" />
      <Shape color="var(--cobalt)" size="120px" x="72%" y="28%" delay={0.5} shape="ring" />
      <Shape color="var(--violet)" size="60px" x="15%" y="75%" delay={2} shape="triangle" />
      <Shape color="var(--mint)" size="50px" x="88%" y="78%" delay={0.8} shape="circle" />
      <Shape color="var(--coral)" size="90px" x="5%" y="20%" delay={1.5} shape="ring" />

      {/* Scrolling vertical text (right side) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 0.3 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.4em] uppercase text-chalk/30 hidden md:flex flex-col items-center gap-4"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ writingMode: 'initial' }}
        >↓</motion.span>
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 max-w-[1200px] w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: started ? 1 : 0, x: started ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="font-mono text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--accent)' }}
        >
          ✦ Creative Studio · Est. 2024
        </motion.p>

        {/* Giant headline — Paper Collage meets FUEGO raw energy */}
        <h1 className="font-display leading-[0.9] mb-8 overflow-hidden" style={{ fontSize: 'clamp(5rem, 16vw, 14rem)' }}>
          {started && <SplitText text="WE" className="block text-chalk" delay={0.3} />}
          {started && (
            <span className="block overflow-hidden" style={{ color: 'var(--accent)' }}>
              <SplitText text="MAKE" className="" delay={0.5} />
            </span>
          )}
          {started && (
            <span
              className="block"
              style={{
                WebkitTextStroke: '2px var(--chalk)',
                color: 'transparent',
                overflow: 'hidden',
              }}
            >
              <SplitText text="ART." className="" delay={0.7} />
            </span>
          )}
        </h1>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: started ? 1 : 0, y: started ? 0 : 30 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-body text-chalk/50 max-w-md mb-12"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7 }}
        >
          A collective of designers, animators, and visual artists. We craft experiences that live between emotion and precision.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
          transition={{ delay: 1.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          {/* Primary magnetic CTA */}
          <div ref={ctaRef} className="magnetic">
            <a
              href="#gallery"
              className="relative inline-flex items-center gap-3 px-8 py-4 font-body font-medium tracking-widest uppercase text-sm overflow-hidden group"
              style={{
                background: 'var(--accent)',
                color: 'var(--ink)',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 100%, 16px 100%)',
              }}
            >
              <span className="relative z-10">See Our Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >→</motion.span>
              {/* Fill layer */}
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ background: 'var(--acid)', transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
              />
            </a>
          </div>

          {/* Secondary ghost CTA */}
          <a
            href="#manifesto"
            className="inline-flex items-center gap-2 px-8 py-4 font-body text-sm tracking-widest uppercase border border-chalk/20 text-chalk/60 hover:border-chalk hover:text-chalk transition-all duration-400"
          >
            Our Manifesto
          </a>
        </motion.div>
      </div>

      {/* Horizontal ruled line with scroll progress indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: started ? 1 : 0 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
      />

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-6 left-6 font-mono text-xs tracking-widest text-chalk/25"
      >
        CHROMASONIC™ · 2024 · CREATIVITY UNBOUND
      </motion.div>
    </section>
  )
}
