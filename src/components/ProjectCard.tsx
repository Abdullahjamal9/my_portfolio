import type { Project } from '../types/portfolio'
import { getProjectVisual } from '../lib/projectVisual'
import { GithubIcon } from './icons/BrandIcons'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const visual = getProjectVisual(project.role)

  return (
    <article className="sticky top-20 mb-24 flex h-[min(36rem,calc(100svh-6rem))] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl shadow-black/40 sm:mb-32 sm:p-8">
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-600">
            {String(index + 1).padStart(2, '0')} · {project.year}
          </span>
          <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
          <p className="mt-1 text-neutral-400">{project.subtitle}</p>
        </div>
        {project.highlight && (
          <span className="shrink-0 rounded-full border border-fuchsia-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fuchsia-400">
            Featured
          </span>
        )}
      </div>

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="mt-6 h-40 min-h-0 w-full shrink-0 rounded-lg object-cover sm:h-48"
        />
      ) : (
        <div
          className={`relative mt-6 flex h-40 min-h-0 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-gradient-to-br sm:h-48 ${visual.gradient}`}
        >
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <visual.Icon size={40} strokeWidth={1.5} className="relative text-white/25 sm:h-12 sm:w-12" />
          <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
            {visual.label}
          </span>
        </div>
      )}

      <p className="mt-6 line-clamp-3 shrink-0 text-neutral-300">{project.description}</p>

      <div className="mt-4 flex shrink-0 flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-neutral-800 px-3 py-1 font-mono text-xs text-neutral-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="accent-gradient mt-4 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold text-black transition-transform hover:scale-105"
        >
          <GithubIcon size={13} />
          View on GitHub
        </a>
      )}
    </article>
  )
}
