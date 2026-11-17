# Barrels (`index.ts`) — referência

Um `index.ts` por contexto, na raiz da pasta. Não criar `index.ts` em subpastas (`animate-ui/components/buttons/` não tem).

| Contexto | Arquivo | Import em telas/seções |
| --- | --- | --- |
| ui | `src/components/ui/index.ts` | `@/components/ui` |
| site | `src/components/site/index.ts` | `@/components/site` |
| animate-ui | `src/components/animate-ui/index.ts` | `@/components/animate-ui` |
| handmade | `src/components/handmade/index.ts` | `@/components/handmade` |
| originkit | `src/components/originkit/index.ts` | `@/components/originkit` |
| hooks | `src/hooks/index.ts` | `@/hooks` |
| sections | `src/sections/index.ts` | `@/sections` |

`src/lib/` não tem barrel: são utilitários pequenos importados pelo arquivo (`@/lib/utils`, `@/lib/asset`, `@/lib/theme`). `cn` fica em `@/lib/utils` porque o shadcn gera esse caminho.

## Escrevendo o `index.ts`

- Blocos em ordem alfabética pelo caminho do arquivo.
- Tipos com `type` no export (`verbatimModuleSyntax` está ligado).
- `export default` vira nomeado com o nome do componente, não do arquivo.
- Um símbolo sai uma vez só, do arquivo onde nasce.

```ts
export { SiteHeader, type SiteNavItem } from "./site-header"
export { default as ClickEffects, type ClickEffectVariant } from "./click-effects"
export { default as GlitchText } from "./ui/glitch-text"
```

## Imports

Telas e seções juntam os símbolos do mesmo contexto em um import:

```ts
import { Reveal, SectionHeading, WhatsAppCta } from "@/components/site"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui"
```

Ordem dos grupos: libs externas (`react`, `lucide-react`, `motion/react`) → linha em branco → `@/components/*` → `@/content`, `@/hooks`, `@/lib/*`, `@/sections`, `@/site.config`.

Dentro de `src/components/`, sempre pelo arquivo, inclusive entre contextos:

```ts
// src/components/site/site-header.tsx
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useActiveSection } from "@/hooks/use-active-section"
```

## animate-ui

O barrel exporta só a camada pronta (`components/`). `primitives/` tem os mesmos nomes (`Button`, `FlipButton`…) e é importado pelo arquivo quando necessário:

```ts
import { Slot, type WithAsChild } from "@/components/animate-ui/primitives/animate/slot"
```

O `Button` do animate-ui sai como `AnimateButton` (e `animateButtonVariants`) para não colidir com o `Button` de `@/components/ui`.

## Pasta nova em `src/components/`

Ganha o `index.ts` no mesmo passo do primeiro símbolo público, entra na tabela acima e no `src/components/README.md`.
