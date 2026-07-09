import { usePortfolio } from '../hooks/usePortfolio'

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio()

  if (testimonials.length === 0) return null

  const track = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="overflow-hidden bg-neutral-950 py-24">
      <h2 className="hero-heading mb-12 px-6 text-center text-3xl font-bold sm:px-10 sm:text-5xl">
        Testimonials
      </h2>
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max gap-6 px-6">
          {track.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="w-80 shrink-0 rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
            >
              <span className="text-2xl">💬</span>
              <p className="mt-4 italic text-neutral-300">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-black"
                  style={{ backgroundColor: testimonial.avatarColor }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-white">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
