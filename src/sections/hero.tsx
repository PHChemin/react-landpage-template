import { WhatsAppCta } from "@/components/site"
import {
  AnimatedGradientText,
  BlurFade,
  InteractiveHoverButton,
  Particles,
  RetroGrid,
  TypingAnimation,
} from "@/components/ui"
import { hero } from "@/content"
import { brandColor } from "@/lib/theme"
import { links, site } from "@/site.config"

/** Primeiro viewport: marca, headline, apoio e contato sobre um fundo vivo. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <RetroGrid
          className="opacity-35 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
          angle={65}
          darkLineColor={brandColor}
          lightLineColor={brandColor}
        />
        <Particles
          className="absolute inset-0"
          quantity={90}
          ease={70}
          size={0.6}
          color={brandColor}
          staticity={40}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/75 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-lg flex-col items-center justify-center px-6 py-28 text-center">
        <BlurFade delay={0.05} inView>
          <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {site.name}
          </p>
        </BlurFade>

        <BlurFade delay={0.12} inView>
          <p className="mt-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            {hero.kicker}
          </p>
        </BlurFade>

        <BlurFade delay={0.2} inView className="mt-4 w-full">
          <h1 id="hero-title" className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            <AnimatedGradientText
              colorFrom="#F4F5F7"
              colorTo={brandColor}
              speed={1.2}
              className="font-display text-3xl font-semibold md:text-4xl"
            >
              {hero.headline}
            </AnimatedGradientText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView className="mt-5 w-full max-w-md">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{hero.support}</p>
        </BlurFade>

        <BlurFade delay={0.38} inView className="mt-6 flex min-h-7 w-full justify-center">
          <TypingAnimation
            prefix="> "
            prefixClassName="text-muted-foreground"
            words={[...hero.typing]}
            loop
            startOnView={false}
            className="font-mono text-sm text-primary"
          />
        </BlurFade>

        <nav className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3" aria-label="Contato">
          <BlurFade delay={0.48} inView>
            <WhatsAppCta className="w-full" pulse />
          </BlurFade>
          <BlurFade delay={0.55} inView>
            <InteractiveHoverButton
              as="a"
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Instagram
            </InteractiveHoverButton>
          </BlurFade>
          <BlurFade delay={0.62} inView>
            <InteractiveHoverButton as="a" href={links.email} className="w-full">
              E-mail
            </InteractiveHoverButton>
          </BlurFade>
        </nav>
      </div>
    </section>
  )
}
