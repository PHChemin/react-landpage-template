---
name: seo
description: SEO e visibilidade em buscadores e assistentes de IA para as landings deste template — pesquisa de intenção, title e description, headings, conteúdo citável, JSON-LD por segmento, SEO local, Open Graph, robots/sitemap, Core Web Vitals e validação. Usar ao preencher src/site.config.ts, escrever textos da página, criar seção de FAQ/serviços, preparar entrega, ou quando o usuário falar de Google, ranqueamento, aparecer em buscas, ChatGPT/Perplexity/IA, compartilhamento no WhatsApp ou Instagram.
---

# SEO

Landing de cliente pequeno ganha busca em três frentes: **busca local** (Google Maps + "serviço perto de mim"), **busca por nome** (quem ouviu falar e procura) e **respostas de IA** (ChatGPT, Perplexity, Gemini, AI Overviews citando o site). As três dependem do mesmo básico: HTML com o conteúdo, dados estruturados corretos e textos que respondem perguntas reais.

## Como o template entrega

| Peça | Onde |
| --- | --- |
| Title, description, canonical, OG, Twitter, theme-color, JSON-LD | `src/site.config.ts` → `scripts/seo-plugin.ts` injeta no `<head>` |
| `robots.txt` e `sitemap.xml` | gerados no build pelo mesmo plugin |
| HTML com todo o conteúdo | pré-render no build (`scripts/prerender.mjs`) |
| Avisos de placeholder, OG ausente, title/description longos | saída do `npm run build` |

Edite o config, não o `index.html`. Campo novo de SEO entra no tipo `SiteConfig` e no plugin.

## Fluxo

```
- [ ] 1. Intenção de busca
- [ ] 2. site.config.ts
- [ ] 3. Conteúdo da página
- [ ] 4. Dados estruturados
- [ ] 5. Imagens, ícones e compartilhamento
- [ ] 6. Performance
- [ ] 7. Fora do site (o que orientar o cliente)
- [ ] 8. Validar
```

### 1. Intenção de busca

Antes de escrever, liste 5–10 buscas que o cliente **quer** ganhar, do jeito que as pessoas digitam (e falam com assistentes):

- serviço + cidade/bairro: "psicóloga em Curitiba", "barbearia Batel"
- serviço + modalidade: "terapia online para ansiedade"
- problema em forma de pergunta: "como saber se preciso de terapia", "quanto custa um bolo de casamento"
- nome da marca e variações de grafia

Escolha **uma** busca principal para o title e o `h1`; as outras viram seções, subtítulos e perguntas do FAQ. Use o vocabulário do público (ver "Expressões" no `CLIENT_BRIEF.md`), não o jargão interno do cliente.

### 2. `site.config.ts`

- **title** (50–60 caracteres): `Marca · serviço principal em Cidade`. A busca principal perto do começo. Nada de "Home" ou "Bem-vindo".
- **description** (140–160): benefício concreto + serviço + onde + convite. É o anúncio do resultado de busca — escreva para ganhar o clique, não para enfileirar palavras.
- **url**: canônica final, com `https://`, `www` ou não conforme o domínio real, barra no fim. Precisa bater com o CNAME do Pages.
- **schemaType**: o tipo mais específico que descreve o negócio ([schema-types.md](schema-types.md)).
- **contact/social/address/areaServed/openingHours**: exatamente como estão no Google Business Profile e no Instagram (NAP consistente — nome, endereço, telefone iguais em todo lugar).
- **allowAiCrawlers**: `true` por padrão (o site aparece e é citado por assistentes). Só `false` se o cliente pedir.

### 3. Conteúdo da página

- Um `h1` com a busca principal escrita de forma natural. Seções com `h2` descritivos — "Atendimento online para ansiedade" diz mais que "Serviços".
- **Fatos citáveis**: frases curtas e autocontidas que uma IA consegue copiar como resposta — quem é, o que faz, para quem, onde, como agendar, quanto tempo, registro profissional (CRP, OAB, CRM), anos de experiência. Números e nomes próprios ajudam.
- **FAQ com perguntas reais** (as que o cliente responde todo dia no WhatsApp). Resposta direta na primeira frase. Marque com `FAQPage` no JSON-LD.
- Cidade/bairro e área atendida escritos no texto, não só no rodapé.
- Texto em HTML, não dentro de imagem. Imagem com `alt` que descreve a cena ("Bolo de casamento de três andares com flores de açúcar"), sem lista de palavras-chave.
- Links externos para perfis oficiais (Instagram, Google Business, Lattes, Doctoralia…) — reforçam a entidade.
- Conteúdo que só aparece depois de animação ou JS **também** precisa estar no HTML pré-renderizado.

### 4. Dados estruturados (JSON-LD)

O plugin gera um `@graph` com a entidade do negócio + `WebSite` a partir do config. Para enriquecer:

- **FAQ**: acrescentar `FAQPage` com as perguntas que aparecem **visíveis** na página.
- **Serviços**: `makesOffer` / `hasOfferCatalog` com os serviços reais.
- **Profissional liberal**: `Person` com `jobTitle`, `identifier` (registro profissional), `knowsAbout`, `alumniOf`.
- **Avaliações**: só se forem reais e estiverem visíveis na página; o Google ignora autoavaliação de `LocalBusiness` para estrelas no resultado.

Exemplos por segmento em [schema-types.md](schema-types.md). Regra: o JSON-LD descreve o que está na página — nunca dado que o visitante não vê.

### 5. Imagens, ícones e compartilhamento

- `public/og-image.png` 1200×630, < 300 kB, com marca + promessa legível em miniatura (WhatsApp corta as bordas — deixe margem). É o que aparece ao colar o link no WhatsApp/Instagram/LinkedIn.
- `public/favicon.svg` + `public/apple-touch-icon.png` (180×180, fundo sólido).
- `themeColor` igual ao fundo do topo da página.

### 6. Performance (Core Web Vitals)

- **LCP** (maior elemento do primeiro viewport, < 2,5s no 4G):
  - imagem do hero em `webp/avif`, com `width`/`height`, `fetchpriority="high"` e **sem** `loading="lazy"`;
  - texto do hero não espera animação via JS para aparecer (skill `motion`).
- **CLS** (< 0,1): toda imagem/vídeo com dimensões ou `aspect-ratio`; fonte com `display=swap` e fallback de métrica parecida.
- **INP** (< 200ms): nada pesado no clique; efeitos de canvas leves.
- Fontes: preferir self-host (`@fontsource-variable/<fonte>` ou arquivos em `public/fonts/` com `<link rel="preload">` da principal). Carregar só os pesos usados.
- Imagens abaixo da dobra com `loading="lazy"` e `decoding="async"`.
- Vídeo de fundo só com poster leve e `preload="none"`.

### 7. Fora do site

O que mais move SEO local não está no código — oriente o usuário a repassar ao cliente:

- **Google Business Profile** criado, verificado, com categoria certa, fotos reais, horário e link para o site. Pedir avaliações a clientes reais.
- **Search Console**: adicionar a propriedade do domínio e enviar `sitemap.xml`. (Bing Webmaster Tools importa do Search Console — ajuda Copilot/ChatGPT.)
- Mesmo NAP no Instagram, WhatsApp Business, diretórios do segmento.
- Link para o site na bio do Instagram e no perfil do WhatsApp Business.

### 8. Validar

- `npm run build` sem avisos de `[seo]`.
- `dist/index.html`: texto da página dentro de `#root`, um `<h1>`, metas e JSON-LD presentes.
- [Rich Results Test](https://search.google.com/test/rich-results) e [Schema Validator](https://validator.schema.org/) com a URL publicada.
- [PageSpeed Insights](https://pagespeed.web.dev/) mobile: Performance, Acessibilidade, Práticas e SEO ≥ 90.
- Preview de link: colar a URL no WhatsApp (ou [opengraph.xyz](https://www.opengraph.xyz/)).
- `https://dominio/robots.txt` e `/sitemap.xml` acessíveis.

## Não fazer

- Repetir palavra-chave à força, texto escondido, lista de cidades sem atendimento real.
- Schema com dado que não está na página (avaliações inventadas, endereço que não existe).
- Title igual ao nome da marca sem o serviço.
- Trocar o domínio canônico depois de indexado sem redirecionar.
- Conteúdo principal só em imagem, vídeo ou PDF.
- Prometer posição no Google: o trabalho aqui é tornar o site elegível e claro; posição depende também de concorrência, avaliações e tempo.

## IA e `llms.txt`

Assistentes leem o HTML sem executar JS — por isso o pré-render é o item mais importante para IA. `llms.txt` é uma convenção opcional sem efeito comprovado em citações; criar só se o cliente pedir (texto curto em `public/llms.txt` com o que o negócio é, faz e onde).
