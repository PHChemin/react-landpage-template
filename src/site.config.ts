/**
 * Identidade, contato e SEO do site — fonte única.
 *
 * Lido pelo app (header, CTAs, rodapé) e pelo plugin `scripts/seo-plugin.ts`,
 * que gera as metas do <head>, o JSON-LD, o robots.txt e o sitemap.xml.
 * Troque todos os valores de exemplo antes da entrega (o build avisa).
 *
 * Este arquivo é importado pelo `vite.config.ts` (Node): sem alias `@/` e sem
 * importar código do app aqui.
 */

export type SchemaType =
  | "LocalBusiness"
  | "ProfessionalService"
  | "Person"
  | "Organization"
  | "Store"
  | "Restaurant"
  | "BeautySalon"
  | "HairSalon"
  | "Dentist"
  | "MedicalClinic"
  | "Physician"
  | "LegalService"
  | "Attorney"
  | "AccountingService"
  | "AutoRepair"
  | "Bakery"
  | "CafeOrCoffeeShop"
  | "PetStore"
  | "VeterinaryCare"
  | "SportsActivityLocation"
  | "HealthClub"
  | "EducationalOrganization"
  | (string & {})

export type SiteConfig = {
  /** Nome da marca como o cliente quer ser buscado. */
  name: string
  /** URL canônica final, com protocolo e barra no fim. */
  url: string
  /** `<title>` da home: "Marca · o que faz (+ cidade)". 50–60 caracteres. */
  title: string
  /** Meta description: benefício + serviço + onde + convite. 140–160 caracteres. */
  description: string
  lang: string
  /** Formato Open Graph (`pt_BR`). */
  locale: string
  /** Cor da barra do navegador no mobile (igual ao fundo do topo). */
  themeColor: string
  /** Caminho em `public/` — PNG ou JPG 1200×630. */
  ogImage: string
  ogImageAlt: string
  /** Tipo schema.org mais específico que descreve o negócio. Ver a skill `seo`. */
  schemaType: SchemaType
  contact: {
    /** DDI + DDD + número, só dígitos. */
    whatsapp: string
    whatsappMessage: string
    email: string
    phone?: string
  }
  /** Perfis oficiais (viram `sameAs` no JSON-LD). */
  social: {
    instagram?: string
    facebook?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
    googleBusiness?: string
  }
  /** Endereço físico. Deixe `undefined` para negócio só online. */
  address?: {
    street: string
    locality: string
    region: string
    postalCode: string
    country: string
  }
  /** Cidades/regiões atendidas (SEO local). */
  areaServed?: string[]
  /** Horário em formato schema.org: "Mo-Fr 09:00-18:00". */
  openingHours?: string[]
  priceRange?: string
  /** Temas que a marca domina (vira `knowsAbout`). */
  knowsAbout?: string[]
  /** Liberar crawlers de IA (GPTBot, ClaudeBot, PerplexityBot…) no robots.txt. */
  allowAiCrawlers: boolean
}

export const site: SiteConfig = {
  name: "Nome da Marca",
  url: "https://www.cliente.com.br/",
  title: "Nome da Marca · Serviço principal em Cidade",
  description:
    "Serviço principal para quem precisa de resultado X em Cidade. Atendimento próximo, sem burocracia: chame no WhatsApp e tire suas dúvidas.",
  lang: "pt-BR",
  locale: "pt_BR",
  themeColor: "#12141a",
  ogImage: "/og-image.png",
  ogImageAlt: "Nome da Marca — serviço principal em Cidade",
  schemaType: "ProfessionalService",
  contact: {
    whatsapp: "5500000000000",
    whatsappMessage: "Olá! Vim pelo site e gostaria de mais informações.",
    email: "contato@cliente.com.br",
  },
  social: {
    instagram: "https://www.instagram.com/SEU_USUARIO",
  },
  areaServed: ["Cidade"],
  allowAiCrawlers: true,
}

export const links = {
  whatsapp: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`,
  email: `mailto:${site.contact.email}`,
  instagram: site.social.instagram ?? "",
  portfolio: "https://example.com",
} as const
