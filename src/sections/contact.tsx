import { ArrowUpRight, Mail } from "lucide-react"

import {
  CopyButton,
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
  LiquidButton,
  PreviewLinkCard,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
  PreviewLinkCardTrigger,
} from "@/components/animate-ui"
import { Reveal, SectionHeading, WhatsAppCta } from "@/components/site"
import { contact } from "@/content"
import { links, site } from "@/site.config"

/** Fechamento: WhatsApp em destaque e canais secundários. */
export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-24 text-center">
      <Reveal>
        <SectionHeading
          id="contato-title"
          align="center"
          eyebrow={contact.eyebrow}
          title={contact.title}
          intro={contact.intro}
        />
      </Reveal>
      <Reveal className="mt-8" delay={80}>
        <WhatsAppCta />
      </Reveal>
      <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-3" delay={120}>
        <FlipButton asChild variant="outline" size="cta" from="bottom">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">
            <FlipButtonFront>Instagram</FlipButtonFront>
            <FlipButtonBack variant="default">{contact.instagramHandle}</FlipButtonBack>
          </a>
        </FlipButton>
        <LiquidButton asChild size="cta">
          <a href={links.email}>
            <Mail aria-hidden />
            E-mail
          </a>
        </LiquidButton>
      </Reveal>
      <Reveal className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground" delay={160}>
        <span>{site.contact.email}</span>
        <CopyButton
          content={site.contact.email}
          variant="ghost"
          size="lg"
          label="Copiar e-mail"
          copiedLabel="E-mail copiado"
        />
      </Reveal>
      <Reveal className="mt-10 text-sm text-muted-foreground" delay={200}>
        <p>
          Veja também o{" "}
          <PreviewLinkCard href={links.portfolio} colorScheme="dark">
            <PreviewLinkCardTrigger
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-foreground underline underline-offset-4"
            >
              {contact.portfolioLabel}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </PreviewLinkCardTrigger>
            <PreviewLinkCardContent target="_blank" rel="noopener noreferrer">
              <PreviewLinkCardImage alt="Prévia do portfólio" />
            </PreviewLinkCardContent>
          </PreviewLinkCard>
          .
        </p>
      </Reveal>
    </section>
  )
}
