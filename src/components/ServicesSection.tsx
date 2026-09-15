import { motion } from 'framer-motion'
import { BarChart3, BrainCircuit, LayoutDashboard } from 'lucide-react'

const SERVICES = [
  {
    name: 'Data Analytics',
    description:
      'Clean messy datasets, write the SQL, and ship Power BI dashboards that drive real business decisions.',
    stack: ['Python', 'SQL', 'Power BI', 'Pandas'],
    Icon: BarChart3,
  },
  {
    name: 'Machine Learning',
    description:
      'Build and evaluate practical ML models for prediction, classification, and recommendation.',
    stack: ['Scikit-learn', 'XGBoost', 'PyTorch'],
    Icon: BrainCircuit,
  },
  {
    name: 'Data Applications',
    description:
      'Ship the full-stack apps, dashboards, and admin tools that put models and data to work.',
    stack: ['React', 'Node.js', 'Next.js', 'MySQL'],
    Icon: LayoutDashboard,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <h2 className="hero-heading mb-12 text-3xl font-bold sm:text-5xl">What I Do</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 transition-colors hover:border-neutral-700 sm:p-8"
          >
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: 'linear-gradient(135deg, #a855f7, #f97316)' }}
            />

            <span className="accent-gradient relative flex h-12 w-12 items-center justify-center rounded-xl text-black">
              <service.Icon size={22} strokeWidth={2.25} />
            </span>

            <h3 className="relative mt-5 text-xl font-semibold text-white">{service.name}</h3>
            <p className="relative mt-2 text-neutral-400">{service.description}</p>

            <div className="relative mt-4 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 font-mono text-xs text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
