import { usePortfolio } from '../hooks/usePortfolio'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const { profile } = usePortfolio()

  return (
    <footer className="border-t border-neutral-900 px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 font-mono text-xs text-neutral-600 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-neutral-300">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
