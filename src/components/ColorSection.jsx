// components/ColorSection.jsx
// Section 2 — FUEGO + Paper Collage chaos energy
// Animated gradient blobs, floating creative tool logos, tilt service cards
import { useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'

/* ── Tool logos as SVG icons ── */
const TOOLS = [
  { name: 'Figma', color: '#F24E1E', symbol: 'F', x: '8%', y: '12%', delay: 0, size: 52 },
  { name: 'PS', color: '#31A8FF', symbol: 'Ps', x: '82%', y: '8%', delay: 0.3, size: 48 },
  { name: 'Blender', color: '#E87D0D', symbol: '⬡', x: '18%', y: '72%', delay: 0.6, size: 44 },
  { name: 'Procreate', color: '#C8FF00', symbol: '✦', x: '75%', y: '65%', delay: 0.9, size: 40 },
  { name: 'AE', color: '#9999FF', symbol: 'Ae', x: '50%', y: '6%', delay: 0.4, size: 46 },
  { name: 'C4D', color: '#FF3C00', symbol: 'C4', x: '90%', y: '38%', delay: 1.1, size: 38 },
  { name: 'Webflow', color: '#4353FF', symbol: 'W', x: '3%', y: '45%', delay: 0.7, size: 42 },
]

function FloatingTool({ name, color, symbol, x, y, delay, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none z-10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{
        opacity: [0, 1, 1],
        scale: [0, 1.1, 1],
        y: [0, -18, 0, 18, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
        y: { delay, duration: 7 + delay, repeat: Infinity, ease: 'easeInOut' },
        rotate: { delay, duration: 9 + delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl font-display text-ink select-none"
        style={{
          width: size, height: size,
          background: color,
          fontSize: size * 0.35,
          boxShadow: `0 8px 32px ${color}55`,
        }}
      >
        {symbol}
      </div>
      <p className="font-mono text-[10px] tracking-widest text-center mt-1 text-chalk/40">{name}</p>
    </motion.div>
  )
}

/* ── Service card with tilt ── */
const SERVICES = [
  {
    title: 'Illustration',
    desc: 'Hand-crafted digital worlds. Every stroke intentional.',
    icon: '🎨',
    accent: '#FF3C00',
    num: '01',
  },
  {
    title: 'Branding',
    desc: 'Identities that feel inevitable. Systems that scale.',
    icon: '◈',
    accent: '#C8FF00',
    num: '02',
  },
  {
    title: 'Motion Design',
    desc: 'Time as a design material. Animation with purpose.',
    icon: '⟳',
    accent: '#0033FF',
    num: '03',
  },
  {
    title: 'UI / UX',
    desc: 'Interfaces where logic meets desire.',
    icon: '⬡',
    accent: '#8B00FF',
    num: '04',
  },
  {
    title: '3D & AR',
    desc: 'Spatial experiences that collapse digital and physical.',
    icon: '◉',
    accent: '#00FFA3',
    num: '05',
  },
  {
    title: 'Direction',
    desc: 'Creative strategy as a competitive weapon.',
    icon: '✦',
    accent: '#FF6B6B',
    num: '06',
  },
]

function ServiceCard({ title, desc, icon, accent, num, index }) {
  const tiltRef = useTilt(10)
  const ref = useInView()

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="tilt-card relative p-7 border border-white/10 group overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
      }}
      data-cursor
    >
      {/* Hover fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: accent }}
      />

      {/* Number */}
      <p className="font-mono text-[11px] tracking-[0.3em] text-chalk/25 mb-6">{num}</p>

      {/* Icon */}
      <div className="text-3xl mb-4" style={{ color: accent, fontStyle: 'normal' }} aria-hidden>
        {icon}
      </div>

      {/* Title */}
      <h3
        className="font-display text-2xl tracking-wider mb-3 text-chalk group-hover:text-white transition-colors"
        style={{ fontSize: 'var(--step-2)' }}
      >
        {title}
      </h3>

      {/* Desc */}
      <p className="font-body text-chalk/50 text-sm leading-relaxed">{desc}</p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: accent, transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
      />
    </motion.div>
  )
}

export default function ColorSection() {
  const titleRef = useInView()
  const gridRef = useInView({ threshold: 0.05 })

  return (
    <section
      id="services"
      className="relative min-h-screen py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0012 0%, #0d0500 50%, #000a1f 100%)' }}
    >
      {/* ── Animated gradient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="blob absolute"
          style={{
            width: '55vw', height: '55vw',
            top: '-15%', left: '-10%',
            background: 'radial-gradient(circle, rgba(255,60,0,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="blob-2 absolute"
          style={{
            width: '45vw', height: '45vw',
            bottom: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(139,0,255,0.35) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="blob-3 absolute"
          style={{
            width: '40vw', height: '40vw',
            top: '30%', left: '40%',
            background: 'radial-gradient(circle, rgba(0,51,255,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
        {/* Acid green blob */}
        <motion.div
          className="blob absolute"
          style={{
            width: '30vw', height: '30vw',
            top: '50%', left: '60%',
            background: 'radial-gradient(circle, rgba(200,255,0,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.25, 1], y: [0, -60, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      {/* ── Floating tool logos ── */}
      <div className="absolute inset-0 pointer-events-none">
        {TOOLS.map((tool) => (
          <FloatingTool key={tool.name} {...tool} />
        ))}
      </div>

      {/* ── Random colorful shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { shape: 'circle', color: '#FF3C00', size: 20, x: '25%', y: '15%', delay: 1 },
          { shape: 'circle', color: '#C8FF00', size: 12, x: '60%', y: '80%', delay: 2 },
          { shape: 'square', color: '#0033FF', size: 16, x: '40%', y: '20%', delay: 0.5 },
          { shape: 'circle', color: '#8B00FF', size: 10, x: '70%', y: '30%', delay: 3 },
          { shape: 'square', color: '#00FFA3', size: 14, x: '12%', y: '60%', delay: 1.5 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={s.shape === 'circle' ? 'rounded-full' : 'rotate-45'}
            style={{
              position: 'absolute',
              width: s.size, height: s.size,
              background: s.color,
              left: s.x, top: s.y,
              opacity: 0.5,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5 + s.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}
      </div>

      {/* ── Section header ── */}
      <div className="relative z-20 max-w-[1400px] mx-auto">
        <div ref={titleRef} className="fade-up mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
            ✦ What We Do
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="fade-up mb-20 overflow-hidden" ref={useInView()}>
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="font-display leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', color: 'var(--chalk)' }}
          >
            COLOR &{' '}
            <span style={{ color: 'var(--accent)', WebkitTextStroke: '1px var(--ember)', WebkitTextFillColor: 'transparent' }}>
              CHAOS
            </span>
          </motion.h2>
        </div>

        {/* ── Animated marquee strip ── */}
        <div className="relative overflow-hidden border-y border-white/10 py-3 mb-20">
          <div className="marquee-track whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="font-display text-sm tracking-[0.3em] pr-16 text-chalk/30">
                ILLUSTRATION · BRANDING · MOTION DESIGN · UI/UX · 3D & AR · CREATIVE DIRECTION · ART DIRECTION · ILLUSTRATION · BRANDING · MOTION DESIGN · UI/UX · 3D & AR · CREATIVE DIRECTION · ART DIRECTION ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── Service cards grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {[
            { num: '200+', label: 'Projects' },
            { num: '48', label: 'Awards' },
            { num: '12', label: 'Years' },
            { num: '30+', label: 'Countries' },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center md:text-left"
            >
              <p className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--accent)' }}>
                {num}
              </p>
              <p className="font-mono text-xs tracking-widest uppercase text-chalk/40 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
