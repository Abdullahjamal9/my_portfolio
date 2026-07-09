# Muhammad Abdullah Jamal — Portfolio

A single-page personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Content is fully decoupled from components — edit `src/data/portfolio.json` and every section updates automatically.

## Install

```bash
npm install
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Structure

```
src/
  data/portfolio.json     # all content: profile, skills, experience, projects, education, testimonials
  types/portfolio.ts      # TypeScript types for the data shape above
  hooks/usePortfolio.ts   # typed hook that reads portfolio.json
  components/             # one component per section, all data-driven
  assets/avatar.svg       # hero avatar (flat illustration style)
```

## Editing content

Everything you'd normally hardcode lives in `src/data/portfolio.json`:

- **profile** — name, tagline, bio, social links (empty string hides a social link/button)
- **skills.categories** — grouped skill tags
- **experience** — job history, shown newest-first as written
- **projects** — set `"highlight": true` on one project to pin it first; leave `"link": ""` to hide the "Live Project" button; leave `"image": ""` to show a placeholder
- **education** — school/certificate history
- **testimonials** — leave the array empty (`[]`) to hide the testimonials section entirely; don't fill it with fake quotes

No component file needs to change when you update any of the above — only the JSON.

## Notes

- The hero avatar (`src/assets/avatar.svg`) is a flat SVG illustration, not a vectorized photo — photoreal portraits don't auto-trace cleanly into editable SVG paths.
- The `Services` section (`src/components/ServicesSection.tsx`) is currently hardcoded (Backend / AI-ML / Frontend / Data-Cloud); move it into the JSON schema if the copy needs to change often.
- Testimonials, if added, scroll as a CSS marquee and pause on hover; they fall back to a scroll-snap list under `prefers-reduced-motion`.
