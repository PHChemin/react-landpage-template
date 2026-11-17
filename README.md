# React Landpage Template

Esqueleto para landings freelance com **Vite + React + TypeScript + Tailwind CSS v4**, motion (Magic UI / Animate UI / Originkit), HTML pré-renderizado para SEO e deploy gratuito no **GitHub Pages**.

Irmão HTML-only: [github-landpage-template](https://github.com/PHChemin/github-landpage-template).

## Stack

| Camada | Escolha |
| --- | --- |
| UI | React 19 + TypeScript |
| Estilo | Tailwind v4 (`@tailwindcss/vite`) + tokens shadcn |
| Motion bank | Magic UI (via shadcn) + Originkit (pré-baixado) + handmade |
| Build | Vite → `dist/` estático, pré-renderizado (conteúdo no HTML) |
| SEO | `src/site.config.ts` → metas, Open Graph, JSON-LD, robots, sitemap |
| Deploy | GitHub Actions → GitHub Pages |

```
código (React, Tailwind, deps)
        │
        ▼  npm run build (vite build + pré-render)
     dist/  (HTML com o conteúdo + CSS/JS)
        │
        ▼  Actions
  GitHub Pages (site no ar)
```

## Começar

```bash
npm install
npm run dev
```

Abra o endereço do terminal (geralmente `http://localhost:5173`).

### Checklist de personalização

1. Preencha `docs/CLIENT_BRIEF.md` e `docs/PRD.md`.
2. Identidade, contatos e SEO em `src/site.config.ts`; textos em `src/content.ts`.
3. Tokens de cor, fonte e movimento em `src/styles/main.css`; fontes da identidade no `index.html`.
4. Seções em `src/sections/` (o demo é vitrine do bank — monte a estrutura do cliente).
5. Logo, fotos, `og-image.png` (1200×630) e `apple-touch-icon.png` em `public/`.
6. `npm run build` (lista os placeholders que sobraram) → `npm run shots`.
7. Deploy: `docs/DEPLOY.md`.

Contato só via links (`wa.me`, `mailto:`, redes) — Pages é estático.

## Banco de componentes

Código já versionado no repo (sem fetch no dia a dia do cliente):

| Origem | Pasta | Política |
| --- | --- | --- |
| **Originkit** | `src/components/originkit/` | **Salvar no template** (limite free ~3 fetches/dia) |
| **Magic UI / shadcn** | `src/components/ui/` | Starter set no template; no projeto: `npx shadcn add @magicui/<nome>` |
| **Handmade** | `src/components/handmade/` | Seus efeitos (ex.: `ClickEffects`) |

Detalhes: [`src/components/README.md`](src/components/README.md).

### Adicionar mais componentes

```bash
# Magic UI / shadcn (sem limite diário típico)
npx shadcn@latest add @magicui/<nome>
npx shadcn@latest add button

# Originkit — preferir crescer o banco no template nos dias calmos
npx originkit login
npx originkit add <nome>
```

Config: `components.json` (shadcn + registry `@magicui`) e `originkit.components.json`.

> Não commite a pasta `.originkit/` (login/cache local). Já está no `.gitignore`.

## Agentes de IA

Instruções em [`AGENTS.md`](AGENTS.md) (lido por Cursor, Codex, Copilot, Gemini…; o Claude Code lê pelo `CLAUDE.md`). Skills em [`.agents/skills/`](.agents/skills/) — `.claude/skills` aponta para a mesma pasta.

| Skill | Para |
| --- | --- |
| `design-landing` | Do tema do cliente ao visual, com prints |
| `building-sections` | Seções, componentes, barrels e imports |
| `motion` | Animações: ferramenta, tokens, reduced motion, performance |
| `seo` | Busca no Google e em assistentes de IA |
| `writing-docs` | Docs só com o estado atual |
| `git-commit` / `pull-request` | Commits e PRs (nada sem pedido; merge só com confirmação) |
| `delivery-qa` | Conferência antes de entregar |

## Docs

| Arquivo | Uso |
| --- | --- |
| [docs/CLIENT_BRIEF.md](docs/CLIENT_BRIEF.md) | Respostas rápidas do cliente |
| [docs/PRD.md](docs/PRD.md) | Requisitos do projeto |
| [docs/SDD.md](docs/SDD.md) | Decisão técnica / arquitetura |
| [docs/UI_GUIDANCE.md](docs/UI_GUIDANCE.md) | Invariantes, heurísticas e território livre de design |
| [docs/ART_DIRECTION.md](docs/ART_DIRECTION.md) | Direção visual vigente do cliente |
| [docs/REFERENCES.md](docs/REFERENCES.md) | Projetos que funcionaram (e o que não repetir) |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Pages, Actions e domínio custom |

## Deploy

1. Publique o repo no GitHub (ou use *Use this template*).
2. **Settings → Pages → Source → GitHub Actions**.
3. Push na `main` (workflow `.github/workflows/deploy.yml`).
4. Se CSS/JS quebrarem em `user.github.io/repo/`, descomente `VITE_BASE_PATH` no workflow.
5. Domínio: `docs/DEPLOY.md`.

## Scripts

```bash
npm run dev       # desenvolvimento
npm run build     # dist/ pré-renderizado + robots.txt + sitemap.xml
npm run preview   # testa o build localmente
npm run shots     # prints 390/1440 em .shots/ + erros do console
```

`npm run shots` usa Playwright via `npx` (sem dependência no projeto). Na primeira vez:

```bash
npx playwright@1.52.0 install chromium
```

## Segurança / o que NÃO versionar

- `.env` / secrets / API keys
- `.originkit/` (credenciais/cache do CLI)
- `node_modules/`, `dist/`, `.shots/`
- Dados reais do cliente (WhatsApp, e-mail) até o fork do projeto — este template usa **placeholders**
