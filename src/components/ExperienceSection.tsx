import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'

export default function ExperienceSection() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <h2 className="hero-heading mb-12 text-3xl font-bold sm:text-5xl">Experience</h2>

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-fuchsia-500/60 via-neutral-800 to-transparent sm:left-[9px]" />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="group relative"
            >
              <span className="accent-gradient absolute top-1.5 -left-8 h-3.5 w-3.5 rounded-full ring-4 ring-black sm:-left-10" />

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 transition-colors group-hover:border-neutral-700 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {job.role} · {job.company}
                  </h3>
                  <span className="rounded-full border border-neutral-800 px-3 py-1 font-mono text-xs text-neutral-400">
                    {job.period}
                  </span>
                </div>
                <p className="mt-2 text-neutral-400">{job.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-neutral-400">
                  {job.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="text-fuchsia-500">—</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
