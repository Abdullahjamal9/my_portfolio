import { motion } from 'framer-motion'
import { BarChart3, BrainCircuit, Code2, Server, Database, Wrench, type LucideIcon } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const ICONS: Record<string, LucideIcon> = {
  'Data & Analytics': BarChart3,
  'Machine Learning': BrainCircuit,
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  Tools: Wrench,
}

export default function SkillsSection() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <h2 className="hero-heading mb-12 text-3xl font-bold sm:text-5xl">Skills</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((category, i) => {
          const Icon = ICONS[category.name] ?? Code2
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 transition-colors hover:border-neutral-700"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f97316)' }}
              />

              <div className="relative flex items-center gap-3">
                <span className="accent-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black">
                  <Icon size={19} strokeWidth={2.25} />
                </span>
                <h3 className="font-semibold text-white">{category.name}</h3>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-300 transition-colors group-hover:border-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
