// components/Gallery.jsx
// Section 5 — Featured work masonry gallery
// Hover: zoom + category overlay reveal animation
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Creative placeholder colors & metadata for portfolio pieces
const WORKS = [
  {
    id: 1,
    title: 'Ember Protocol',
    category: 'Branding',
    year: '2024',
    bg: 'linear-gradient(135deg, #FF3C00 0%, #FF8C00 100%)',
    accent: '#FF3C00',
    span: 'col-span-1 row-span-2',
    tags: ['Identity', 'Motion'],
  },
  {
    id: 2,
    title: 'Void Studies',
    category: 'Illustration',
    year: '2024',
    bg: 'linear-gradient(135deg, #0a0a2e 0%, #1a003a 100%)',
    accent: '#8B00FF',
    span: 'col-span-1 row-span-1',
    tags: ['Digital Art', 'Print'],
  },
  {
    id: 3,
    title: 'Acid Flora',
    category: 'Motion Design',
    year: '2023',
    bg: 'linear-gradient(135deg, #001a00 0%, #003300 100%)',
    accent: '#C8FF00',
    span: 'col-span-1 row-span-1',
    tags: ['Animation', '3D'],
  },
  {
    id: 4,
    title: 'Cobalt OS',
    category: 'UI / UX',
    year: '2024',
    bg: 'linear-gradient(135deg, #000830 0%, #001166 100%)',
    accent: '#0033FF',
    span: 'col-span-2 row-span-1',
    tags: ['Interface', 'Product'],
  },
  {
    id: 5,
    title: 'Séquence No.7',
    category: 'Direction',
    year: '2023',
    bg: 'linear-gradient(135deg, #1a0000 0%, #330000 100%)',
    accent: '#FF6B6B',
    span: 'col-span-1 row-span-1',
    tags: ['Campaign', 'Film'],
  },
  {
    id: 6,
    title: 'Mint Frequency',
    category: '3D & AR',
    year: '2024',
    bg: 'linear-gradient(135deg, #001a12 0%, #003322 100%)',
    accent: '#00FFA3',
    span: 'col-span-1 row-span-2',
    tags: ['Spatial', 'Immersive'],
  },
]

function WorkCard({ work }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${work.span}`}
      style={{ background: work.bg, minHeight: 260, borderRadius: 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      data-cursor
    >
      {/* Abstract visual placeholder */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric abstract art for each card */}
        <motion.div
          className="absolute"
          style={{
            width: '60%', height: '60%',
            top: '10%', left: '20%',
            border: `1px solid ${work.accent}30`,
            borderRadius: '50%',
          }}
          animate={hovered ? { scale: 1.4, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={hovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="font-display opacity-10"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              color: work.accent,
              letterSpacing: '-0.05em',
            }}
          >
            {work.id.toString().padStart(2, '0')}
          </div>
        </motion.div>

        {/* Small floating dots pattern */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              background: work.accent,
              opacity: 0.2 + i * 0.05,
              top: `${15 + i * 12}%`,
              left: `${10 + i * 14}%`,
            }}
            animate={hovered ? { y: -12, opacity: 0.5 } : { y: 0, opacity: 0.2 + i * 0.05 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          />
        ))}
      </div>

      {/* Always-visible bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: work.accent }}>
              {work.category}
            </p>
            <h3 className="font-heading text-white" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
              {work.title}
            </h3>
          </div>
          <p className="font-mono text-xs text-white/30">{work.year}</p>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 flex flex-col justify-between p-5 z-20"
            style={{ background: `${work.accent}15`, backdropFilter: 'blur(2px)' }}
          >
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 font-mono text-[10px] tracking-widest uppercase border"
                  style={{ borderColor: `${work.accent}60`, color: work.accent }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View arrow */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-white/70">View Project</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-white text-lg"
              >
                →
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border accent on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ border: `1px solid ${work.accent}60` }}
      />
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--accent)' }}
            >
              ✦ Selected Work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="font-display leading-none"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', color: 'var(--chalk)' }}
              >
                FEATURED
                <br />
                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                  WORK
                </span>
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="font-body text-sm tracking-widest uppercase text-chalk/40 hover:text-chalk transition-colors flex items-center gap-2 self-start md:self-end"
          >
            All Projects →
          </motion.a>
        </div>

        {/* Masonry-ish CSS grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-4">
          {WORKS.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {/* Second marquee row (reversed) */}
        <div className="relative overflow-hidden border-t border-white/6 pt-4 mt-16">
          <div className="marquee-track-reverse whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="font-display text-sm tracking-[0.3em] pr-12 text-chalk/15">
                EMBER PROTOCOL · VOID STUDIES · ACID FLORA · COBALT OS · SÉQUENCE NO.7 · MINT FREQUENCY · EMBER PROTOCOL · VOID STUDIES · ACID FLORA · COBALT OS · SÉQUENCE NO.7 · MINT FREQUENCY ·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
