import { existsSync } from "node:fs"
import path from "node:path"
import type { Plugin } from "vite"

import type { SiteConfig } from "../src/site.config"

/** Textos de exemplo do template. O build avisa enquanto algum continuar no config. */
const PLACEHOLDERS = ["Nome da Marca", "cliente.com.br", "5500000000000", "SEU_USUARIO", "Cidade"]

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
]

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

const absolute = (site: SiteConfig, file: string) => new URL(file.replace(/^\//, ""), site.url).href

function jsonLd(site: SiteConfig) {
  const sameAs = Object.values(site.social).filter(Boolean)
  const isPerson = site.schemaType === "Person"

  const entity: Record<string, unknown> = {
    "@type": site.schemaType,
    "@id": `${site.url}#marca`,
    name: site.name,
    url: site.url,
    description: site.description,
    image: absolute(site, site.ogImage),
    email: site.contact.email,
    telephone: site.contact.phone ?? `+${site.contact.whatsapp}`,
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout: site.knowsAbout,
  }

  if (!isPerson) {
    entity.areaServed = site.areaServed
    entity.openingHours = site.openingHours
    entity.priceRange = site.priceRange
    entity.address = site.address && {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    }
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      entity,
      {
        "@type": "WebSite",
        "@id": `${site.url}#site`,
        url: site.url,
        name: site.name,
        inLanguage: site.lang,
        publisher: { "@id": `${site.url}#marca` },
      },
    ],
  }

  // `<` escapado: o JSON não consegue fechar a tag <script>.
  return JSON.stringify(graph, null, 2).replace(/</g, "\\u003c")
}

function headTags(site: SiteConfig) {
  const image = absolute(site, site.ogImage)
  const meta = (attr: "name" | "property", key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`

  return [
    `<title>${escapeAttr(site.title)}</title>`,
    meta("name", "description", site.description),
    `<link rel="canonical" href="${site.url}" />`,
    meta("name", "theme-color", site.themeColor),
    meta("name", "robots", "index, follow, max-image-preview:large"),
    meta("property", "og:type", "website"),
    meta("property", "og:locale", site.locale),
    meta("property", "og:site_name", site.name),
    meta("property", "og:title", site.title),
    meta("property", "og:description", site.description),
    meta("property", "og:url", site.url),
    meta("property", "og:image", image),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", site.ogImageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", site.title),
    meta("name", "twitter:description", site.description),
    meta("name", "twitter:image", image),
    `<script type="application/ld+json">\n${jsonLd(site)}\n</script>`,
  ].join("\n    ")
}

function robots(site: SiteConfig) {
  const blocks = ["User-agent: *", "Allow: /", ""]
  for (const bot of AI_CRAWLERS) {
    blocks.push(`User-agent: ${bot}`, site.allowAiCrawlers ? "Allow: /" : "Disallow: /", "")
  }
  blocks.push(`Sitemap: ${absolute(site, "sitemap.xml")}`, "")
  return blocks.join("\n")
}

function sitemap(site: SiteConfig) {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`
}

function warnings(site: SiteConfig, publicDir: string) {
  const found: string[] = []
  const flat = JSON.stringify(site)
  for (const text of PLACEHOLDERS) {
    if (flat.includes(text)) found.push(`placeholder "${text}" em src/site.config.ts`)
  }
  if (!site.url.endsWith("/")) found.push("site.url precisa terminar com /")
  if (!existsSync(path.join(publicDir, site.ogImage))) found.push(`imagem OG ausente: public${site.ogImage} (1200×630)`)
  if (site.title.length > 60) found.push(`title com ${site.title.length} caracteres (ideal ≤ 60)`)
  if (site.description.length > 160) found.push(`description com ${site.description.length} caracteres (ideal ≤ 160)`)
  return found
}

/**
 * SEO a partir de `src/site.config.ts`:
 * - troca `<!--seo-head-->` no index.html por title, metas, OG, Twitter e JSON-LD;
 * - no build, gera `robots.txt` e `sitemap.xml` e avisa sobre placeholders.
 */
export function seo(site: SiteConfig): Plugin {
  let publicDir = "public"
  let isSsr = false

  return {
    name: "landpage-seo",
    configResolved(config) {
      publicDir = config.publicDir
      isSsr = Boolean(config.build.ssr)
    },
    transformIndexHtml(html) {
      return html
        .replace("<!--seo-head-->", headTags(site))
        .replace(/<html lang="[^"]*"/, `<html lang="${site.lang}"`)
    },
    generateBundle() {
      if (isSsr) return
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots(site) })
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap(site) })

      const found = warnings(site, publicDir)
      if (found.length) {
        this.warn(`\n[seo] Revisar antes da entrega:\n  - ${found.join("\n  - ")}\n`)
      }
    },
  }
}
