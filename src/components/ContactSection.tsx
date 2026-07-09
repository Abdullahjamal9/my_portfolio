import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'
import { Spotlight } from './ui/Spotlight'

export default function ContactSection() {
  const { profile } = usePortfolio()

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-black/[0.96] px-6 py-16 text-center sm:px-16 sm:py-24"
      >
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" fill="white" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-400">
            Contact
          </span>
          <h2 className="hero-heading mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Let's build something.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-balance text-neutral-400">
            Open to {profile.role.toLowerCase()} roles and freelance builds, based in{' '}
            {profile.location}, available remote.
          </p>

          {profile.social.email && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.social.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="accent-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
              >
                <Mail size={18} className="shrink-0" />
                {profile.social.email}
              </a>
              {profile.social.phone && (
                <a
                  href={`tel:${profile.social.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-300"
                >
                  or call {profile.social.phone}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          )}

          <SocialLinks social={profile.social} className="mt-10 justify-center" />
        </div>
      </motion.div>
    </section>
  )
}
