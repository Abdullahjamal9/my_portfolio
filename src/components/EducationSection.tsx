import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function EducationSection() {
  const { education } = usePortfolio()

  if (education.length === 0) return null

  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <h2 className="hero-heading mb-12 text-3xl font-bold sm:text-5xl">Education</h2>

      <div className="flex flex-col gap-4">
        {education.map((entry, i) => (
          <motion.div
            key={`${entry.institution}-${entry.period}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
            className="group flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 transition-colors hover:border-neutral-700"
          >
            <span className="accent-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black">
              <GraduationCap size={19} strokeWidth={2.25} />
            </span>

            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold text-white">{entry.credential}</h3>
                <p className="mt-1 text-sm text-neutral-400">{entry.institution}</p>
              </div>
              <span className="rounded-full border border-neutral-800 px-3 py-1 font-mono text-xs text-neutral-400">
                {entry.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
