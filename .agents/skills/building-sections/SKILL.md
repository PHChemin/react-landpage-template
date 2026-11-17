---
name: building-sections
description: Como criar seções e componentes React neste template — onde cada arquivo fica, anatomia de uma seção, padrões de código, barrels (index.ts) e imports, compatibilidade com o pré-render e acessibilidade. Usar ao criar, dividir, mover ou revisar uma seção ou componente, ao adicionar componente ao bank (shadcn/Magic UI/Animate UI/Originkit), ou ao escrever imports em App.tsx e em src/sections.
---

# Seções e componentes

A página é uma pilha de seções. Cada seção é um componente em `src/sections/`, e `src/App.tsx` só compõe. A forma de cada seção vem do conceito do cliente (`docs/ART_DIRECTION.md`), não do demo — o demo mostra a mecânica, não o layout.

## Onde fica cada coisa

```
É uma faixa/bloco da página?                    → src/sections/<nome>.tsx
Aparece em 2+ seções (título, CTA, moldura)?    → src/components/site/
É um efeito/peça autoral deste cliente?          → src/components/handmade/
Veio de registry (shadcn, Magic UI, Animate UI)? → src/components/ui/ | animate-ui/ | originkit/
Hook reutilizável?                              → src/hooks/
Texto?                                          → src/content.ts
Nome, contato, URL, redes?                      → src/site.config.ts
```

Não abstraia antes da hora. Peça usada uma vez fica dentro da seção (até como função local no mesmo arquivo). Promova para `site/` na **segunda** repetição.

## Anatomia de uma seção

```tsx
import { Reveal, SectionHeading } from "@/components/site"
import { Marquee } from "@/components/ui"
import { services } from "@/content"

/** Uma frase: o que a seção faz pelo visitante. */
export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <SectionHeading id="servicos-title" eyebrow={services.eyebrow} title={services.title} />
      </Reveal>
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {services.items.map((item, index) => (
          <Reveal as="li" key={item.title} index={index}>
            …
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
```

- `<section>` com `id` (âncora do menu, igual ao `id` em `nav` de `content.ts`) e `aria-labelledby` apontando para o `h2`.
- `scroll-mt-*` para a âncora não cair embaixo do header fixo.
- Um `h1` na página (no hero). Cada seção abre com `h2`; itens internos com `h3`. Não pular nível por causa do tamanho — tamanho é classe, nível é estrutura.
- Lista de coisas é `ul/ol`, números de prova são `dl`, artigo independente é `article`.
- Textos vêm de `content.ts`. Layout não carrega frase solta: o cliente pede troca de texto o tempo todo, e o SEO lê esse conteúdo.
- Exportar no `src/sections/index.ts` e encaixar em `App.tsx` dentro de `<main id="conteudo">`.

## Padrões de código

- Componente função com **export nomeado** (`export function Hero`). `export default` só no `App`.
- Arquivo em kebab-case (`site-footer.tsx`), componente em PascalCase (`SiteFooter`).
- Props como `type XProps = { … }` logo acima do componente. Aceite `className` e repasse com `cn()` no elemento raiz quando a peça for reutilizável.
- Comentário JSDoc de uma linha dizendo **para que** a peça serve; comentários internos só para o porquê não óbvio.
- Cor, fonte, raio e duração vêm dos tokens de `src/styles/main.css` (`bg-primary`, `font-display`, `ease-out-soft`, `var(--duration-base)`). Hex solto só em efeito canvas/WebGL, via `brandColor` (`src/lib/theme.ts`).
- Arquivos de `public/` pelo helper `asset("/foto.webp")` (`src/lib/asset.ts`) — funciona em domínio próprio e em `/repo/`.
- React 19: `ref` é prop comum (sem `forwardRef` em código novo). Sem `useMemo`/`useCallback` por reflexo — só para cálculo caro ou identidade que um efeito/filho realmente precisa.
- Efeito com listener, timer, observer ou rAF **sempre** devolve cleanup.
- `key` estável vinda do dado (título, slug), nunca `Math.random()`; índice só em lista fixa que não reordena.
- Estado mínimo: derive do que já existe em vez de duplicar em `useState`.

## Compatível com o pré-render

O build roda `App` no Node (`src/entry-server.tsx`) e o navegador hidrata por cima. O HTML do servidor e o primeiro render do cliente precisam ser **idênticos**.

- Nada de `window`, `document`, `localStorage`, `matchMedia` ou medidas do DOM **no corpo do componente** ou no `useState(() => …)`. Use dentro de `useEffect`, em handlers, ou com `useSyncExternalStore` + `getServerSnapshot` (ver `src/hooks/use-prefers-reduced-motion.ts`).
- Nada de `Math.random()` ou `Date.now()` no render. IDs com `useId()`; aleatoriedade visual com gerador semeado (ver `seededRandom` em `originkit/ui/glitch-text.tsx`).
- Conteúdo que só existe depois do JS (contador que começa em 0, texto digitado) deve sair no HTML com o valor final — crawler e leitor sem JS leem o HTML.
- `npm run shots` lista erros de hidratação do console. Rode depois de criar seção.

## Barrels e imports

Cada contexto tem um `index.ts` na raiz da pasta. Detalhes, exemplos e casos especiais em [exports.md](exports.md).

- `src/App.tsx` e `src/sections/*` importam do barrel: `@/components/ui`, `@/components/site`, `@/components/animate-ui`, `@/components/handmade`, `@/components/originkit`, `@/hooks`, `@/sections`.
- Dentro de `src/components/` o import é **pelo arquivo** (`@/components/ui/sheet`) — barrel importado por quem ele reexporta cria ciclo.
- Símbolo novo que faz parte da API do contexto entra no `index.ts` no mesmo passo em que é criado.

## Adicionar componente ao bank

1. `npx shadcn@latest add @magicui/<nome>` (ou `@aceternity`, `@animate-ui`, componente shadcn). Originkit: `npx originkit add <nome>`.
2. Revisar o arquivo gerado antes de usar:
   - cores para tokens do tema (nada de `neutral-900` fixo);
   - reduced motion (skill `motion`);
   - nada de `window`/aleatoriedade no render (seção acima);
   - textos de UI e `aria-label` em pt-BR.
3. Exportar no `index.ts` do contexto.
4. Registrar em `src/components/README.md` (tabela do contexto e, se couber, "Escolha por clima").

Reinstalar um componente sobrescreve os ajustes — confira o diff.

## Acessibilidade mínima

- Contraste AA (4.5:1 texto, 3:1 texto grande e ícones de ação).
- Alvo de toque ≥ 44×44px nos CTAs e itens de menu.
- Foco visível em tudo que é clicável; nada de `outline: none` sem substituto.
- Imagem informativa com `alt` descritivo; decorativa com `alt=""` e camadas decorativas com `aria-hidden`.
- Link que abre nova aba avisa (`<span className="sr-only"> (abre em nova aba)</span>`) e usa `rel="noopener noreferrer"`.
- Conteúdo duplicado para efeito (marquee, eco de texto) fica `aria-hidden`.
- Ícone sozinho em botão precisa de `aria-label`.

## Checklist da seção

- [ ] Arquivo em `src/sections/`, exportado no barrel, encaixado no `App`
- [ ] `id` + `aria-labelledby` + `h2`; `id` bate com `nav` se estiver no menu
- [ ] Textos em `content.ts`; contatos de `site.config.ts`
- [ ] Imports pelos barrels
- [ ] Tokens do tema, sem hex solto
- [ ] Sem `window`/aleatoriedade no render; `npm run shots` sem erro de hidratação
- [ ] Animações seguem a skill `motion`
- [ ] Conferida em 390px e 1440px
