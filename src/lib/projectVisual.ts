import { Code2, BrainCircuit, Cpu, BarChart3, type LucideIcon } from 'lucide-react'

interface ProjectVisual {
  Icon: LucideIcon
  label: string
  gradient: string
}

const VISUALS: Record<string, ProjectVisual> = {
  'Full-Stack Developer': {
    Icon: Code2,
    label: 'Full-Stack',
    gradient: 'from-blue-500/20 via-neutral-900 to-purple-500/20',
  },
  'ML Engineer': {
    Icon: BrainCircuit,
    label: 'Machine Learning',
    gradient: 'from-fuchsia-500/20 via-neutral-900 to-pink-500/20',
  },
  'Deep Learning Engineer': {
    Icon: Cpu,
    label: 'Deep Learning',
    gradient: 'from-orange-500/20 via-neutral-900 to-rose-500/20',
  },
  'Data Analyst': {
    Icon: BarChart3,
    label: 'Data Analysis',
    gradient: 'from-cyan-500/20 via-neutral-900 to-blue-500/20',
  },
}

const DEFAULT_VISUAL: ProjectVisual = {
  Icon: Code2,
  label: 'Project',
  gradient: 'from-neutral-700/20 via-neutral-900 to-neutral-700/20',
}

export function getProjectVisual(role: string): ProjectVisual {
  return VISUALS[role] ?? DEFAULT_VISUAL
}
