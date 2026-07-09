import { useEffect, useRef, useState } from 'react'
import { FileDown } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { profile } = usePortfolio()
  const [hidden, setHidden] = useState(false)
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

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-transform duration-300 ease-out sm:px-10 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <a href="#home" className="font-mono text-sm text-neutral-200">
        {profile.shortName}
        <span className="text-fuchsia-500">.</span>
      </a>

      <div className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400 sm:flex">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </div>

      {profile.resumeUrl && (
        <a
          href={profile.resumeUrl}
          download
          className="accent-gradient flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] font-semibold text-black transition-transform hover:scale-105 sm:px-4 sm:text-xs"
        >
          <FileDown size={13} />
          Resume
        </a>
      )}
    </nav>
  )
}
