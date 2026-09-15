import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileDown, Menu, X } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const menuContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const menuItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { profile } = usePortfolio()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      if (y <= 10) {
        setHidden(false)
      } else if (y > lastY.current) {
        setHidden(true)
      } else if (y < lastY.current) {
        setHidden(false)
      }
      lastY.current = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 px-6 py-5 transition-transform duration-300 ease-out sm:px-10 ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Mobile-only row: hamburger — centered name — resume */}
        <div className="relative flex items-center justify-between md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
          >
            <Menu size={18} />
          </button>

          <a
            href="#home"
            className="absolute left-1/2 -translate-x-1/2 font-mono text-sm text-neutral-200"
          >
            {profile.shortName}
            <span className="text-fuchsia-500">.</span>
          </a>

          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              download
              aria-label="Download resume"
              className="accent-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition-transform hover:scale-105"
            >
              <FileDown size={15} />
            </a>
          ) : (
            <span className="h-9 w-9 shrink-0" />
          )}
        </div>

        {/* Tablet + desktop row: full inline nav from md up */}
        <div className="hidden items-center justify-between md:flex">
          <a href="#home" className="font-mono text-sm text-neutral-200">
            {profile.shortName}
            <span className="text-fuchsia-500">.</span>
          </a>

          <div className="flex gap-4 font-mono text-xs uppercase tracking-widest text-neutral-400 lg:gap-8">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </div>

          {profile.resumeUrl && (
            <>
              {/* Tablet: icon-only, matching the mobile resume button */}
              <a
                href={profile.resumeUrl}
                download
                aria-label="Download resume"
                className="accent-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition-transform hover:scale-105 lg:hidden"
              >
                <FileDown size={15} />
              </a>
              {/* Desktop: full pill with label */}
              <a
                href={profile.resumeUrl}
                download
                className="accent-gradient hidden items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold text-black transition-transform hover:scale-105 lg:flex"
              >
                <FileDown size={13} />
                Resume
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Mobile-only dropdown menu: content-sized card, not a full-screen takeover */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={closeMenu}
              className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="menu-panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:px-0 sm:pt-6 md:hidden"
            >
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/98 shadow-2xl shadow-black/60">
                <div className="flex items-center justify-between px-6 py-5">
                  <a href="#home" onClick={closeMenu} className="font-mono text-sm text-neutral-200">
                    {profile.shortName}
                    <span className="text-fuchsia-500">.</span>
                  </a>
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={menuContainerVariants}
                  className="flex flex-col items-center gap-1 px-4 pb-6"
                >
                  {LINKS.map((link) => (
                    <motion.a
                      key={link.href}
                      variants={menuItemVariants}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      href={link.href}
                      onClick={closeMenu}
                      className="w-full rounded-xl px-4 py-2.5 text-center font-mono text-base uppercase tracking-widest text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  {profile.resumeUrl && (
                    <motion.a
                      variants={menuItemVariants}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      href={profile.resumeUrl}
                      download
                      onClick={closeMenu}
                      className="accent-gradient mt-3 flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-semibold text-black"
                    >
                      <FileDown size={15} />
                      Resume
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
