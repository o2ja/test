// components/Timeline.jsx
// Section 4 — Creative Process timeline
// GSAP ScrollTrigger for sequential reveal, alternating left/right layout
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    phase: 'Discovery',
    title: 'Listening before speaking',
    desc: "We immerse ourselves in your world before touching a single pixel. Deep research, competitive analysis, brand archaeology. We find what's true about you.",
    color: '#FF3C00',
    icon: '◎',
    duration: '1–2 weeks',
  },
  {
    num: '02',
    phase: 'Strategy',
    title: 'Finding the signal',
    desc: 'From the noise of possibilities, we extract a single sharp idea. Creative brief, territory mapping, moodboards that provoke — not comfort.',
    color: '#C8FF00',
    icon: '◈',
    duration: '1 week',
  },
  {
    num: '03',
    phase: 'Concepting',
    title: 'Making things ugly first',
    desc: 'Rapid iteration. Sketches, collages, experiments that fail gloriously. We explore the outer edges so the final direction feels inevitable.',
    color: '#0033FF',
    icon: '⬡',
    duration: '2 weeks',
  },
  {
    num: '04',
    phase: 'Craft',
    title: 'Pixel by pixel precision',
    desc: 'This is where obsession lives. Typography at 0.01em intervals. Colors pulled from emotion, not hex codes. Motion that breathes.',
    color: '#8B00FF',
    icon: '✦',
    duration: '2–4 weeks',
  },
  {
    num: '05',
    phase: 'Launch',
    title: 'Releasing it into the world',
    desc: 'Assets, guidelines, strategy. We ensure what we built together survives first contact with reality — and grows from it.',
    color: '#00FFA3',
    icon: '◉',
    duration: '1 week',
  },
]

function TimelineStep({ step, index }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Content side */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        {/* Phase tag */}
        <p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-3"
          style={{ color: step.color }}
        >
          {step.phase}
        </p>

        {/* Title */}
        <h3
          className="font-heading text-chalk mb-4"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-body text-chalk/50 leading-relaxed max-w-md" style={{ fontSize: 'var(--step-0)' }}>
          {step.desc}
        </p>

        {/* Duration badge */}
        <div
          className={`inline-flex items-center gap-2 mt-5 px-4 py-1.5 border font-mono text-xs tracking-widest uppercase ${isEven ? 'md:ml-auto' : ''}`}
          style={{ borderColor: `${step.color}40`, color: step.color }}
        >
          <span>⏱</span> {step.duration}
        </div>
      </div>

      {/* Center node */}
      <div className="flex flex-col items-center gap-0 shrink-0 mt-2">
        {/* Number icon circle */}
        <motion.div
          whileInView={{ scale: [0, 1.15, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative flex items-center justify-center rounded-full text-ink font-display text-xl"
          style={{
            width: 64, height: 64,
            background: step.color,
            boxShadow: `0 0 40px ${step.color}55`,
            fontSize: '1.6rem',
          }}
        >
          {step.icon}
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: step.color }}
          />
        </motion.div>

        {/* Step number */}
        <span className="font-mono text-xs tracking-widest text-chalk/25 mt-2">{step.num}</span>
      </div>

      {/* Empty spacer on alternating side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function Timeline() {
  const lineRef = useRef(null)

  // GSAP animate the vertical line on scroll
  useEffect(() => {
    const importGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const line = lineRef.current
        if (!line) return

        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        )
      } catch (e) {
        // Fallback gracefully if GSAP isn't loaded
        console.warn('GSAP not available:', e)
      }
    }
    importGSAP()
  }, [])

  return (
    <section
      id="process"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'var(--accent)' }}
        >
          ✦ How We Work
        </motion.p>

        <div className="overflow-hidden mb-20">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="font-display"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', color: 'var(--chalk)', lineHeight: 0.9 }}
          >
            THE
            <br />
            <span style={{ color: 'var(--accent)' }}>PROCESS</span>
          </motion.h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical center line (desktop) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
          {/* Animated fill line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--ember), var(--acid), var(--cobalt), var(--violet), var(--mint))' }}
          />

          {/* Mobile left line */}
          <div
            className="absolute left-[31px] top-0 bottom-0 w-px md:hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-20 md:gap-24">
            {STEPS.map((step, i) => (
              <TimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
