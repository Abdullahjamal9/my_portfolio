import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'
import { Spotlight } from './ui/Spotlight'
import { SplineScene } from './ui/SplineScene'

export default function HeroSection() {
  const { profile } = usePortfolio()

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
          <h1 className="hero-heading text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm {profile.shortName}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-balance text-neutral-300 md:mx-0">
            {profile.tagline}
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
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
