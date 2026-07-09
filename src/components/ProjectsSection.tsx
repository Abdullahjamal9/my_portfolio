import { usePortfolio } from '../hooks/usePortfolio'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { projects } = usePortfolio()
  const sorted = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight))

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <div className="mb-12 flex items-baseline justify-between border-b border-neutral-800 pb-4">
        <h2 className="hero-heading text-3xl font-bold sm:text-5xl">Projects</h2>
        <span className="font-mono text-xs text-neutral-500">
          ({sorted.length})
        </span>
      </div>
      <div>
        {sorted.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
