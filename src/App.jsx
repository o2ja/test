// App.jsx
// Root component — orchestrates all sections, loader, smooth scroll, chaos mode
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'

// Components
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ColorSection from './components/ColorSection'
import MonochromeSection from './components/MonochromeSection'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ColorWheel from './components/ColorWheel'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [chaosMode, setChaosMode] = useState(true) // default: chaos (color) mode

  // Initialize Lenis smooth scrolling
  useSmoothScroll()

  // Apply/remove order mode class globally
  useEffect(() => {
    if (!chaosMode) {
      document.documentElement.classList.add('order-mode')
    } else {
      document.documentElement.classList.remove('order-mode')
    }
  }, [chaosMode])

  return (
    <>
      {/* Custom cursor — always present */}
      <CustomCursor />

      {/* Floating color wheel — appears after load */}
      {loaded && <ColorWheel />}

      {/* Page loader */}
      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main site content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Sticky navigation */}
        <Navbar chaosMode={chaosMode} setChaosMode={setChaosMode} />

        <main>
          {/* S1 — Hero: WRECK-energy split text, mouse gradient, magnetic CTA */}
          <Hero />

          {/* S2 — Color & Chaos: FUEGO palette, blobs, tool logos, tilt cards */}
          <ColorSection />

          {/* S3 — Monochrome: Jules Atelier B&W manifesto, SVG draw */}
          <MonochromeSection />

          {/* S4 — Process Timeline: GSAP scroll-triggered sequential reveal */}
          <Timeline />

          {/* S5 — Gallery: Masonry grid, hover zoom + overlay */}
          <Gallery />

          {/* S6 — Testimonials: Stacked animated cards with navigation */}
          <Testimonials />
        </main>

        {/* S7 — Footer: Social links, newsletter, back-to-top */}
        <Footer />
      </motion.div>

      {/* Global chaos/order transition overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[8000]"
        animate={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key={chaosMode ? 'chaos' : 'order'}
        style={{ background: chaosMode ? 'var(--ember)' : '#ffffff' }}
        transition={{ duration: 0 }}
      >
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
          className="absolute inset-0"
          style={{ background: 'inherit' }}
        />
      </motion.div>
    </>
  )
}
