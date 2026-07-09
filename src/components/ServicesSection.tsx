import { motion } from 'framer-motion'
import { Server, BrainCircuit, Code2, Cloud } from 'lucide-react'

// TODO: move these rows into portfolio.json once the service copy stabilizes.
const SERVICES = [
  {
    name: 'Backend',
    description: 'APIs and internal tools in Node.js and Python, backed by SQL or MongoDB, with real admin control.',
    Icon: Server,
  },
  {
    name: 'AI / ML',
    description: 'Predictive models and vision/NLP pipelines — from scikit-learn baselines to PyTorch and Hugging Face.',
    Icon: BrainCircuit,
  },
  {
    name: 'Frontend',
    description: 'React and Next.js interfaces, typed end to end, built to stay maintainable as content changes.',
    Icon: Code2,
  },
  {
    name: 'Data / Cloud',
    description: 'Cleaning pipelines, Power BI dashboards, and deployments that turn raw data into decisions.',
    Icon: Cloud,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <h2 className="hero-heading mb-12 text-3xl font-bold sm:text-5xl">Services</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}
