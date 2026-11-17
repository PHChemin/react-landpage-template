# React Landpage Template — instruções para agentes

Esqueleto para landings e linktrees de clientes: Vite + React 19 + TypeScript + Tailwind CSS v4, pré-renderizado no build e publicado no GitHub Pages. Vale para qualquer agente (Claude, Cursor, Codex, Copilot, Gemini…).

## Skills

Ficam em `.agents/skills/<nome>/SKILL.md` (`.claude/skills` é um link para a mesma pasta). Se a sua ferramenta não carrega skills sozinha, **leia o `SKILL.md` correspondente antes de começar a tarefa**.

| Tarefa | Skill |
| --- | --- |
| Personalizar para um cliente, criar ou refazer o visual, aplicar feedback visual | `design-landing` |
| Criar ou alterar seção/componente, mexer em imports ou barrels, adicionar componente ao bank | `building-sections` |
| Criar, ajustar ou revisar qualquer animação ou efeito | `motion` |
| Title, description, Open Graph, JSON-LD, robots, sitemap, performance, busca por IA | `seo` |
| Escrever ou editar docs, READMEs, comentários, textos do site, corpo de commit/PR | `writing-docs` |
| Preparar ou fazer um commit | `git-commit` |
| Abrir, atualizar ou fazer merge de PR | `pull-request` |
| Conferir antes de entregar ou publicar | `delivery-qa` |

## Regras do projeto

### Stack (não trocar sem pedido explícito)

- Vite + React + TypeScript + Tailwind v4 (`@tailwindcss/vite`), componentes shadcn/Magic UI/Animate UI/Originkit.
- Site estático: `npm run build` gera `dist/` já pré-renderizado (`scripts/prerender.mjs`). Sem Next, sem backend.
- Contato só por links (`wa.me`, `mailto:`, redes).
- Deploy: push na `main` → `.github/workflows/deploy.yml` → GitHub Pages.

### Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Identidade, contatos, SEO | `src/site.config.ts` |
| Textos da página | `src/content.ts` |
| Seções da página | `src/sections/` |
| Peças reutilizadas entre seções | `src/components/site/` |
| Efeitos autorais | `src/components/handmade/` |
| Bank de registries | `src/components/{ui,animate-ui,originkit}/` |
| Hooks | `src/hooks/` |
| Tokens de cor, fonte e movimento | `src/styles/main.css` |
| Brief, requisitos, direção de arte | `docs/` |

Telas e seções importam pelo barrel do contexto (`@/components/ui`, `@/components/site`, `@/sections`…). Dentro de `src/components/` o import é pelo arquivo. Detalhes na skill `building-sections`.

### Ao personalizar um cliente

1. Ler `docs/CLIENT_BRIEF.md` e `docs/PRD.md`. Campo vazio não bloqueia: registrar premissa e seguir.
2. Seguir a skill `design-landing`; a direção escolhida vai para `docs/ART_DIRECTION.md` **antes** do código visual.
3. Seguir `docs/UI_GUIDANCE.md`: invariantes não se negociam, heurísticas se quebram com motivo, o resto é território livre.
4. Trocar placeholders em `src/site.config.ts` e `src/content.ts` (o build lista os que sobraram).
5. Verificar com `npm run shots` (390px e 1440px) — não entregar visual "de cabeça".

### Identidade visual

- **Tipografia e cores da marca vêm da identidade do cliente.** Fonte fora da identidade só entra se for sugerida e **validada** pelo usuário antes de ir para o código. Cliente sem identidade tipográfica → propor e aguardar validação.
- O demo em `src/sections/` é vitrine do bank, **não** layout base. Cada cliente começa do conceito dele, não do demo nem do último projeto.

### Documentação

Docs, comentários e textos versionados registram **só o estado atual**, como fato. Nada de contexto de conversa, alternativas descartadas ou histórico de decisão — isso fica no chat e no git. Ver `writing-docs`.

### Git

- **Nunca** commitar, dar push, abrir PR ou fazer merge sem pedido explícito. Merge exige pedido explícito **e** confirmação. Ver `git-commit` e `pull-request`.
- Não versionar `node_modules/`, `dist/`, `.shots/`, `.env*`, `.originkit/`.

## Comandos

```bash
npm run dev      # http://localhost:5173
npm run build    # dist/ pré-renderizado + robots.txt + sitemap.xml
npm run preview  # serve o build
npm run shots    # prints 390/1440 em .shots/ + erros do console
```
