import { ClickEffects } from "@/components/handmade"
import { SiteHeader, WhatsAppCta } from "@/components/site"
import { nav } from "@/content"
import { brandColor } from "@/lib/theme"
import { About, Contact, Hero, Services, SiteFooter, Works } from "@/sections"
import { site } from "@/site.config"

/** A página só compõe seções. Cada seção vive em `src/sections/`. */
export default function App() {
  return (
    <div className="bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>

      <ClickEffects color={brandColor} effectSize={80} duration={0.4} />

      <SiteHeader
        brand={<span className="font-display tracking-tight">{site.name}</span>}
        links={nav}
        cta={<WhatsAppCta size="md" className="rounded-full" />}
      />

      <main id="conteudo">
        <Hero />
        <Services />
        <Works />
        <About />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  )
}
