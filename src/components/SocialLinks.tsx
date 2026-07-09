import { Mail, Globe } from 'lucide-react'
import type { Social } from '../types/portfolio'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons'

interface SocialLinksProps {
  social: Social
  className?: string
}

const PILL_CLASS =
  'flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white'

export default function SocialLinks({ social, className = '' }: SocialLinksProps) {
  const links = [
    { key: 'github', href: social.github, label: 'GitHub', Icon: GithubIcon },
    { key: 'linkedin', href: social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { key: 'instagram', href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { key: 'website', href: social.website, label: 'Website', Icon: Globe },
    {
      key: 'email',
      href: social.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${social.email}` : '',
      label: 'Email',
      Icon: Mail,
    },
  ].filter((l) => l.href)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={PILL_CLASS}
        >
          <Icon />
          <span className="hidden sm:inline">{label}</span>
        </a>
      ))}
    </div>
  )
}
