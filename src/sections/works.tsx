import { MotionCarousel, RippleButton, RippleButtonRipples } from "@/components/animate-ui"
import { Reveal, SectionHeading } from "@/components/site"
import { works } from "@/content"

/** Portfólio em carrossel com CTA para o contato. */
export function Works() {
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-title" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-24">
      <Reveal>
        <SectionHeading id="trabalhos-title" eyebrow={works.eyebrow} title={works.title} intro={works.intro} />
      </Reveal>
      <Reveal className="mt-12" delay={80}>
        <MotionCarousel
          ariaLabel={works.eyebrow}
          options={{ loop: true }}
          showDotLabel={false}
          getDotLabel={(index) => works.items[index]?.title ?? `Slide ${index + 1}`}
          slides={works.items.map((work) => (
            <div className="flex size-full flex-col justify-end bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_60%)] p-6">
              <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">{work.tag}</p>
              <p className="mt-1 font-display text-2xl font-semibold">{work.title}</p>
            </div>
          ))}
        />
      </Reveal>
      <Reveal className="mt-10 flex justify-center" delay={120}>
        <RippleButton asChild size="cta">
          <a href="#contato">
            {works.cta}
            <RippleButtonRipples />
          </a>
        </RippleButton>
      </Reveal>
    </section>
  )
}
