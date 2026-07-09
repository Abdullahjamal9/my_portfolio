import figureUrl from '../assets/figure.png'
import { usePortfolio } from '../hooks/usePortfolio'

export default function AboutSection() {
  const { profile } = usePortfolio()

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
        <div className="mx-auto w-48 sm:w-56 md:w-full">
          <img
            src={figureUrl}
            alt={profile.name}
            className="w-full select-none object-contain"
            draggable={false}
          />
        </div>

        <div>
          <h2 className="hero-heading mb-6 text-3xl font-bold sm:text-5xl">About</h2>
          <p className="about-bio text-lg leading-relaxed text-neutral-300 sm:text-xl">
            {profile.bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-neutral-500">
            <span>{profile.role}</span>
            <span>{profile.location}</span>
            <span>{profile.yearsOfExperience} years experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}
