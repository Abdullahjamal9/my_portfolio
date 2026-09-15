import { motion } from 'framer-motion'
import { FileDown, ArrowRight } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'
import { Spotlight } from './ui/Spotlight'
import { SplineScene } from './ui/SplineScene'

export default function HeroSection() {
  const { profile, experience } = usePortfolio()
  const current = experience[0]

  return (
    <header
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black/[0.96] px-6 pt-24 pb-0 sm:px-10"
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-20 text-center md:text-left"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
            {profile.trajectory}
          </span>
          <h1 className="hero-heading mt-3 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm {profile.shortName}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-balance text-neutral-300 md:mx-0">
            {profile.tagline}
          </p>
          {current && (
            <p className="mx-auto mt-3 max-w-md text-sm text-neutral-500 md:mx-0">
              Currently: {current.role} @ {current.shortCompany ?? current.company}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="accent-gradient inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              View My Work
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
              >
                <FileDown size={15} />
                Download Resume
              </a>
            )}
          </div>

          <div className="mt-6 flex justify-center md:justify-start">
            <SocialLinks social={profile.social} />
          </div>
        </motion.div>

        {/* Right content — interactive 3D robot (follows the cursor) */}
        <div className="h-[420px] w-full sm:h-[520px] md:h-[600px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </header>
  )
}
