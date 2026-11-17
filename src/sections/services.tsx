import { MessageCircle, Sparkles, Timer } from "lucide-react"

import { Reveal, SectionHeading } from "@/components/site"
import { Marquee } from "@/components/ui"
import { services } from "@/content"

const icons = [Sparkles, Timer, MessageCircle]

/** Faixa em movimento com os serviços + um bloco por serviço. */
export function Services() {
  return (
    <>
      <Marquee pauseOnHover className="border-y border-border py-4 [--duration:28s]" aria-hidden>
        {services.items.map((service) => (
          <span key={service.title} className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {service.title}
          </span>
        ))}
      </Marquee>

      <section id="servicos" aria-labelledby="servicos-title" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
        <Reveal>
          <SectionHeading id="servicos-title" eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = icons[index] ?? Sparkles
            return (
              <Reveal as="li" key={service.title} index={index}>
                <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.text}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </section>
    </>
  )
}
