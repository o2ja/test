// components/Footer.jsx
// Section 7 — Animated footer with newsletter, social links, back-to-top
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic'

const SOCIALS = [
  { name: 'Instagram', handle: '@chromasonic' },
  { name: 'Behance', handle: '/chromasonic' },
  { name: 'Dribbble', handle: '/chromasonic' },
  { name: 'LinkedIn', handle: '/chromasonic' },
  { name: 'Twitter / X', handle: '@chromasonic' },
]

function SocialLink({ name, handle }) {
  const ref = useMagnetic(0.25)
  return (
    <motion.a
      ref={ref}
      href="#"
      className="magnetic group flex items-center justify-between py-4 border-b border-white/8 last:border-none"
      whileHover={{ x: 8 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-body text-chalk/50 group-hover:text-chalk transition-colors duration-300 text-sm tracking-wider">
        {name}
      </span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-chalk/25 group-hover:text-chalk/50 transition-colors">
          {handle}
        </span>
        <motion.span
          className="text-chalk/30 group-hover:text-chalk transition-colors"
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          ↗
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)
  const topRef = useMagnetic(0.3)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Giant background text */}
      <div
        className="absolute bottom-0 left-0 right-0 font-display leading-none pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          color: 'rgba(255,255,255,0.025)',
          bottom: '-0.1em',
        }}
        aria-hidden
      >
        CHROMA
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 pt-24 pb-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--chalk)' }}
              >
                CHROMA<span style={{ color: 'var(--accent)' }}>SONIC</span>
              </h2>
              <p className="font-body text-chalk/40 text-sm leading-relaxed mb-8 max-w-xs">
                A creative studio obsessed with the space between color and clarity. Based everywhere, from nowhere.
              </p>
              <a
                href="mailto:hello@chromasonic.studio"
                className="font-mono text-sm tracking-wider text-chalk/40 hover:text-chalk transition-colors duration-300"
              >
                hello@chromasonic.studio
              </a>
            </motion.div>
          </div>

          {/* Social links column */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.3em] uppercase text-chalk/25 mb-6"
            >
              Social
            </motion.p>
            <div>
              {SOCIALS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <SocialLink {...s} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter column */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.3em] uppercase text-chalk/25 mb-6"
            >
              Newsletter
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="font-body text-chalk/40 text-sm leading-relaxed mb-6">
                Raw inspiration, work-in-progress, and occasional manifestos. No spam. Unsubscribe when you want.
              </p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 font-body text-sm text-chalk placeholder-chalk/20 focus:outline-none focus:border-white/40 transition-colors duration-300"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="relative overflow-hidden px-6 py-3 font-body text-sm tracking-widest uppercase text-ink font-medium group"
                      style={{ background: 'var(--accent)' }}
                    >
                      <span className="relative z-10">Subscribe</span>
                      <span
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ background: 'var(--acid)', transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
                      />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-white/10 p-4"
                  >
                    <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--mint)' }}>
                      ✓ You're in
                    </p>
                    <p className="font-body text-sm text-chalk/50">
                      Welcome to the collective. Expect the unexpected.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="font-mono text-xs tracking-widest text-chalk/20">
            © 2024 Chromasonic Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <a href="#" className="font-mono text-xs tracking-widest text-chalk/20 hover:text-chalk/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs tracking-widest text-chalk/20 hover:text-chalk/50 transition-colors">
              Legal
            </a>

            {/* Back to top magnetic */}
            <div ref={topRef} className="magnetic">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-chalk/30 hover:text-chalk transition-colors duration-300 group"
                aria-label="Back to top"
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="text-base"
                >
                  ↑
                </motion.span>
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
