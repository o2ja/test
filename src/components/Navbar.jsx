// components/Navbar.jsx
// Sticky nav with hamburger menu, animated overlay on mobile
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic'

const NAV_LINKS = [
  { label: 'Work', href: '#gallery' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#manifesto' },
  { label: 'Contact', href: '#footer' },
]

function MagneticLink({ href, children }) {
  const ref = useMagnetic(0.3)
  return (
    <a
      ref={ref}
      href={href}
      className="magnetic relative font-body text-sm tracking-widest uppercase text-chalk/70 hover:text-chalk transition-colors duration-300"
    >
      <span className="relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">
        {children}
      </span>
    </a>
  )
}

export default function Navbar({ chaosMode, setChaosMode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoRef = useMagnetic(0.2)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-500"
        style={{
          padding: scrolled ? '1rem 2rem' : '2rem 2rem',
          background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <nav className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo */}
          <a ref={logoRef} href="#" className="magnetic font-display text-xl tracking-[0.15em] text-chalk">
            CHROMA<span style={{ color: 'var(--accent)' }}>SONIC</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <MagneticLink key={link.href} href={link.href}>{link.label}</MagneticLink>
            ))}
          </div>

          {/* Right side: toggle + hamburger */}
          <div className="flex items-center gap-6">
            {/* Chaos / Order Toggle */}
            <button
              onClick={() => setChaosMode(!chaosMode)}
              className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
              style={{ color: chaosMode ? 'var(--acid)' : 'var(--chalk)' }}
              aria-label="Toggle chaos mode"
            >
              <span
                className="relative inline-block w-10 h-5 rounded-full transition-colors duration-500 border border-current"
                style={{ background: chaosMode ? 'var(--ember)' : 'rgba(255,255,255,0.1)' }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-current transition-transform duration-500"
                  style={{ transform: chaosMode ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </span>
              {chaosMode ? 'CHAOS' : 'ORDER'}
            </button>

            {/* Hamburger */}
            <button
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] md:gap-[6px] z-10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span
                className="burger-line block h-[1.5px] w-6 bg-chalk transition-all duration-300"
                style={{ transform: open ? 'translateY(7.5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="burger-line block h-[1.5px] w-6 bg-chalk transition-all duration-300"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="burger-line block h-[1.5px] w-6 bg-chalk transition-all duration-300"
                style={{ transform: open ? 'translateY(-7.5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[8900] flex flex-col justify-center px-8"
            style={{ background: 'var(--ink)' }}
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: 0.2 + i * 0.08, ease: [0.23, 1, 0.32, 1], duration: 0.6 }}
                  className="font-display text-[clamp(2.5rem,8vw,5rem)] tracking-wider text-chalk hover:text-ember transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile chaos toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-12"
            >
              <button
                onClick={() => setChaosMode(!chaosMode)}
                className="flex items-center gap-3 font-mono text-sm tracking-widest uppercase"
                style={{ color: chaosMode ? 'var(--acid)' : 'var(--chalk)' }}
              >
                <span
                  className="relative inline-block w-12 h-6 rounded-full transition-colors duration-500 border border-current"
                  style={{ background: chaosMode ? 'var(--ember)' : 'rgba(255,255,255,0.1)' }}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-current transition-transform duration-500"
                    style={{ transform: chaosMode ? 'translateX(24px)' : 'translateX(0)' }}
                  />
                </span>
                {chaosMode ? 'CHAOS MODE ON' : 'ORDER MODE'}
              </button>
            </motion.div>

            {/* Social links row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="absolute bottom-12 left-8 flex gap-8 font-mono text-xs tracking-widest text-chalk/40"
            >
              {['Instagram', 'Behance', 'Dribbble'].map((s) => (
                <a key={s} href="#footer" onClick={() => setOpen(false)} className="hover:text-chalk transition-colors">{s}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
