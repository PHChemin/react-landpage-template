import { Reveal, SectionHeading } from "@/components/site"
import { NumberTicker } from "@/components/ui"
import { about } from "@/content"

/** Números de prova social. O HTML pré-renderizado já traz o valor final. */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <SectionHeading id="sobre-title" eyebrow={about.eyebrow} title={about.title} intro={about.intro} />
        </Reveal>
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          {about.stats.map((stat, index) => (
            <Reveal key={stat.label} index={index}>
              <dt className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">{stat.label}</dt>
              <dd className="mt-2 font-mono text-5xl font-semibold text-foreground">
                <NumberTicker value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
