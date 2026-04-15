// components/MonochromeSection.jsx
// Section 3 — Jules Atelier aesthetic: full B&W, manifesto text, SVG line drawing
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'

/* ── Single manifesto line with hover char effect ── */
function ManifestoLine({ text, delay = 0, size = 'large', italic = false }) {
  const ref = useInView({ threshold: 0.3 })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className={[
          'font-heading block leading-tight select-none',
          italic ? 'italic' : '',
          size === 'large'
            ? 'text-white'
            : 'text-white/50',
        ].join(' ')}
        style={{
          fontSize:
            size === 'large'
              ? 'clamp(2.5rem, 6vw, 6rem)'
              : size === 'medium'
              ? 'clamp(1.2rem, 2.5vw, 2rem)'
              : 'clamp(0.9rem, 1.5vw, 1.1rem)',
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="manifesto-char inline-block"
            style={{ cursor: 'default' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </motion.p>
    </div>
  )
}

/* ── Self-drawing SVG abstract line art ── */
function DrawingSVG() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('path, line, circle, polyline')
    paths.forEach((path) => {
      const len = path.getTotalLength ? path.getTotalLength() : 300
      path.style.strokeDasharray = len
      path.style.strokeDashoffset = len
      path.style.transition = 'none'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((path, i) => {
            path.style.transition = `stroke-dashoffset ${1.8 + i * 0.3}s cubic-bezier(0.23,1,0.32,1) ${i * 0.2}s`
            path.style.strokeDashoffset = '0'
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-3xl mx-auto"
      aria-hidden="true"
    >
      {/* Abstract eye / vision motif */}
      <path
        d="M 80 250 Q 400 80 720 250 Q 400 420 80 250 Z"
        stroke="white"
        strokeWidth="1"
        opacity="0.6"
      />
      <ellipse
        cx="400" cy="250" rx="80" ry="80"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle
        cx="400" cy="250" r="28"
        stroke="white"
        strokeWidth="2"
        opacity="0.9"
      />
      {/* Radiating lines */}
      <line x1="400" y1="170" x2="400" y2="100" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="400" y1="330" x2="400" y2="400" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="320" y1="250" x2="220" y2="250" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="480" y1="250" x2="580" y2="250" stroke="white" strokeWidth="0.8" opacity="0.3" />
      {/* Diagonal details */}
      <line x1="344" y1="194" x2="280" y2="130" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="456" y1="306" x2="520" y2="370" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="456" y1="194" x2="520" y2="130" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="344" y1="306" x2="280" y2="370" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* Outer accent marks */}
      <path d="M 60 220 L 40 220 L 40 280 L 60 280" stroke="white" strokeWidth="1" opacity="0.4" />
      <path d="M 740 220 L 760 220 L 760 280 L 740 280" stroke="white" strokeWidth="1" opacity="0.4" />
      {/* Top inscription */}
      <path
        d="M 200 100 Q 400 60 600 100"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="4 6"
        opacity="0.2"
      />
      {/* Inner detail lines */}
      <polyline
        points="350,230 370,250 350,270"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinejoin="round"
      />
      <polyline
        points="450,230 430,250 450,270"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MonochromeSection() {
  return (
    <section
      id="manifesto"
      className="relative min-h-screen py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vertical rule */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute left-6 md:left-16 top-32 bottom-32 w-px bg-white/10 origin-top hidden md:block"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="font-mono text-xs tracking-[0.4em] uppercase text-white/30 mb-16 pl-8 md:pl-0"
        >
          ✦ Our Manifesto
        </motion.p>

        {/* Manifesto text block — Paper Collage layout with intentional asymmetry */}
        <div className="space-y-3 md:space-y-4 mb-24">
          <ManifestoLine text="Clarity is not" size="large" delay={0} />
          <div className="flex items-baseline gap-6">
            <ManifestoLine text="the absence" size="large" italic delay={0.1} />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-mono text-xs text-white/20 tracking-widest self-center hidden md:block"
            >
              [01]
            </motion.span>
          </div>
          <ManifestoLine text="of color —" size="large" delay={0.2} />
          <div className="h-6" />
          <ManifestoLine text="it is the courage" size="large" delay={0.3} />
          <ManifestoLine text="to subtract." size="large" italic delay={0.4} />
        </div>

        {/* Section divider with Roman numeral */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-6 mb-16 origin-left"
        >
          <div className="flex-1 h-px bg-white/15" />
          <span className="font-mono text-xs tracking-[0.4em] text-white/25">II</span>
          <div className="flex-1 h-px bg-white/15" />
        </motion.div>

        {/* SVG self-drawing art */}
        <div className="mb-16">
          <DrawingSVG />
        </div>

        {/* Secondary manifesto paragraphs */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {[
            {
              head: 'We believe',
              body: 'that the most powerful work lives in the tension between restraint and release. Between the white space and the saturated mark.',
              delay: 0,
            },
            {
              head: 'We refuse',
              body: 'the forgettable. Every project is a chance to say something true. To leave a mark that outlives its brief.',
              delay: 0.15,
            },
          ].map(({ head, body, delay }) => (
            <motion.div
              key={head}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <p
                className="font-heading italic mb-4"
                style={{ fontSize: 'var(--step-2)', color: 'white' }}
              >
                {head}
              </p>
              <p
                className="font-body text-white/45 leading-relaxed"
                style={{ fontSize: 'var(--step-0)' }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative border-l-2 border-white/20 pl-8 py-2"
        >
          <p
            className="font-heading italic text-white/70 leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
          >
            "Color is emotion. Black and white is truth.<br />
            We speak both languages fluently."
          </p>
          <footer className="mt-4 font-mono text-xs tracking-widest text-white/25 uppercase">
            — Chromasonic Studio
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
