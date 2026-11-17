# Software Design Document

Visão técnica do esqueleto **React Landpage Template** para landings freelance.

## Stack

| Camada | Escolha | Motivo |
| --- | --- | --- |
| UI | React 19 + TypeScript | Componentes animados e composição moderna |
| Estilo | Tailwind CSS v4 + shadcn tokens | Utilitários + `@theme` |
| Motion | Magic UI + Originkit + handmade | Banco local; Originkit pré-baixado |
| Build | Vite | Dev rápido, `dist/` estático para Pages |
| Deploy | GitHub Pages + Actions | Hospedagem sem mensalidade |
| Contato | Links externos (wa.me, mailto, redes) | Sem backend |

## Arquitetura

```
código-fonte (repo)
  → npm run build
      1. vite build                → dist/ (HTML/CSS/JS) + robots.txt + sitemap.xml
      2. vite build --ssr          → dist/.ssr/entry-server.js
      3. scripts/prerender.mjs     → injeta o HTML da página em dist/index.html
  → GitHub Actions → GitHub Pages
  → URL github.io ou domínio do cliente
```

No navegador, `src/main.tsx` hidrata o HTML pré-renderizado (`hydrateRoot`). Em `npm run dev` não há pré-render: o React renderiza do zero.

Crawlers (Google, assistentes de IA, previews de link) recebem o conteúdo completo sem executar JS.

## Estrutura de pastas

```
/
├── index.html                  # <!--seo-head--> e <!--app-html--> são preenchidos no build
├── AGENTS.md / CLAUDE.md       # instruções para agentes de IA
├── .agents/skills/             # skills (design, seções, motion, seo, git, PR, QA, docs)
├── .claude/skills → .agents/skills
├── scripts/
│   ├── seo-plugin.ts           # metas, JSON-LD, robots, sitemap (lê site.config)
│   ├── prerender.mjs           # pré-render pós-build
│   └── shots.mjs               # prints 390/1440 + erros do console
├── src/
│   ├── main.tsx                # hidratação no navegador
│   ├── entry-server.tsx        # render no build
│   ├── App.tsx                 # compõe as seções
│   ├── site.config.ts          # identidade, contatos, SEO
│   ├── content.ts              # textos da página
│   ├── sections/               # seções da página (+ index.ts)
│   ├── components/             # cada contexto com index.ts
│   │   ├── site/               # peças reutilizadas entre seções
│   │   ├── handmade/           # efeitos autorais
│   │   ├── ui/                 # shadcn + Magic UI + Aceternity
│   │   ├── animate-ui/         # Animate UI (components + primitives)
│   │   └── originkit/          # bank Originkit
│   ├── hooks/                  # hooks (+ index.ts)
│   ├── lib/                    # utils, asset(), theme
│   └── styles/main.css         # Tailwind + tokens de cor, fonte e movimento
├── public/                     # favicon, apple-touch-icon, og-image, fotos
├── docs/                       # brief, PRD, direção de arte, referências
├── components.json             # shadcn + registries
├── originkit.components.json
└── .github/                    # deploy.yml, template de PR
```

## Regras de design técnico

1. Site 100% estático após o build; só `dist/` vai para o Pages.
2. `base` do Vite: `./` por padrão (repo Pages e domínio custom). Arquivos de `public/` via `asset()`.
3. Componentes renderizam igual no Node e no navegador: nada de `window`, `Math.random()` ou `Date.now()` no render (skill `building-sections`).
4. Conteúdo visível sem JS: estados escondidos de animação só sob `html.js` (skill `motion`).
5. SEO a partir de uma fonte só: `src/site.config.ts`.
6. Telas importam pelos barrels; dentro de `src/components/` o import é pelo arquivo.
7. Originkit: versionar componentes no template; não commitar `.originkit/`.

## Domínio

Ver `DEPLOY.md`.

## Extensões futuras (opcional)

- Várias páginas → React Router + pré-render por rota (o `prerender.mjs` gera um HTML por caminho) e uma entrada por URL no `sitemap.xml`
- Formulário → Formspree / similar
- Host alternativo → Cloudflare Pages consome o mesmo `dist/`
