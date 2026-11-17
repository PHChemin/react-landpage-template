---
name: motion
description: Boas práticas de animação e efeitos para as landings deste template — quando animar, qual ferramenta usar (CSS, scroll-driven, motion/react, canvas), tokens de duração e easing, performance, reduced motion, acessibilidade e compatibilidade com o pré-render. Usar ao criar, ajustar ou revisar qualquer animação, transição, efeito de hover, entrada no scroll, loop decorativo, contador, canvas ou componente animado do bank.
---

# Movimento

Animação aqui tem três trabalhos, nesta ordem:

1. **Contar o conceito** — o gesto do ofício do cliente (folha que cresce, papel que dobra, linha que se desenha). É o momento assinatura.
2. **Orientar** — mostrar de onde algo veio, o que mudou, para onde olhar.
3. **Responder** — confirmar toque, hover, foco, cópia.

Se não faz nenhum dos três, é ruído. A liberdade criativa é grande — a forma e o ritmo do movimento são território livre —, mas tudo abaixo de "Invariantes" vale sempre.

## Invariantes

- Animar só `transform` e `opacity` (e `clip-path` pequeno, em peça única). Nada de `width`, `height`, `top/left`, `margin`, `box-shadow` ou `filter: blur` em área grande, em loop.
- `prefers-reduced-motion` respeitado em toda animação, por **um** caminho por camada (ver abaixo). Reduzir ≠ sumir: troque deslocamento por fade curto ou mostre o estado final.
- Conteúdo **nunca** depende do JS para aparecer. O HTML pré-renderizado precisa estar legível sem JS e sem animação.
- Nada que pisque mais de 3 vezes por segundo.
- Movimento automático que dura mais de 5s (marquee, carrossel automático, loop chamativo) precisa de pausa ou ser decorativo, discreto e `aria-hidden`.
- Hover tem equivalente em `:focus-visible`; efeito que depende de hover não esconde informação no toque.
- Loops param fora da tela e com a aba oculta.
- Listener, timer, observer e `requestAnimationFrame` sempre com cleanup.

## Escolha da ferramenta

Vá descendo até a primeira que resolve:

| Precisa de | Use |
| --- | --- |
| Hover, foco, press, troca de estado | CSS `transition` |
| Sequência ao carregar, loop decorativo, desenho de SVG | CSS `@keyframes` |
| Entrada quando aparece na tela | `Reveal` (`@/components/site`) |
| Movimento amarrado à posição do scroll (parallax, progresso) | CSS `animation-timeline: view()/scroll()` dentro de `@supports`, com o estado final como fallback |
| Gesto (arrastar), spring, layout que muda, saída de elemento (`AnimatePresence`), sequência coordenada por JS | `motion/react` |
| Centenas de partículas, desenho livre | `<canvas>` + `requestAnimationFrame` (modelo: `handmade/click-effects.tsx`) |

CSS roda antes do JS carregar e não espera a hidratação — por isso é a primeira opção, principalmente no hero (animação de entrada via JS atrasa o LCP: o texto só conta como pintado quando fica visível).

## Tokens

Definidos em `src/styles/main.css`. Ajuste o **ritmo** ao conceito (um consultório respira devagar; uma hamburgueria é rápida), mas use os tokens em vez de números soltos.

| Token | Valor padrão | Uso |
| --- | --- | --- |
| `--duration-instant` | 120ms | press, toggle |
| `--duration-fast` | 200ms | hover, foco, cor |
| `--duration-base` | 320ms | abrir menu, trocar painel |
| `--duration-slow` | 600ms | entrada no scroll |
| `--duration-scene` | 1200ms | sequência do hero, desenho de SVG |
| `--stagger` | 80ms | intervalo entre itens de uma lista |
| `--ease-out-soft` | `cubic-bezier(.22,.8,.24,1)` | entradas (chega rápido, assenta devagar) |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | loops, movimentos de ida e volta |
| `--ease-spring` | `cubic-bezier(.34,1.4,.64,1)` | pequeno overshoot em feedback lúdico |

No Tailwind: `ease-out-soft`, `ease-in-out-soft`, `ease-spring`, `duration-(--duration-fast)`.

Regras de bolso: saída mais curta que entrada; UI responde em ≤ 200ms; nada de `linear` em movimento de objeto (só em rotação contínua e marquee); `ease-in` puro quase nunca.

## Reduced motion — um caminho por camada

| Camada | Como |
| --- | --- |
| CSS | `@media (prefers-reduced-motion: reduce)` no próprio bloco do efeito, trocando por fade ou estado final. O bloco global em `main.css` é só rede de segurança (zera duração **e** atraso). |
| JS / React | `usePrefersReducedMotion()` dentro de componente; `prefersReducedMotion()` em handler ou canvas. Ambos de `@/hooks`. Não criar outro hook nem chamar `matchMedia` solto. |
| motion/react | O app já está em `<MotionConfig reducedMotion="user">`: transform e layout são desligados, opacity continua. Para trocar a coreografia, use o hook. |

Testar: DevTools → Rendering → *Emulate prefers-reduced-motion: reduce*, ou `npm run shots` (o print `*-full.png` já usa reduce).

## Padrões que funcionam

- **Wrapper anima a entrada, filho cuida da interação.** `Reveal`/keyframe com `fill-mode: both` no wrapper; hover/press no elemento interno. No mesmo elemento, o `transform` da animação preenchida vence o do `:active` e o press some.
- **Stagger por variável CSS**: `index={i}` no `Reveal` (vira `--i`) ou `style={{ "--i": i }}` + `transition-delay: calc(var(--i) * var(--stagger))`. Um mecanismo só por página.
- **Variação por custom property**: `--fold`, `--dur`, `--delay`, `--r` por item, uma keyframe só.
- **Delay negativo** dessincroniza loops sem esperar: `animation-delay: calc(var(--seed) * -8s)`.
- **Propriedades individuais** (`translate`, `rotate`, `scale`) para posicionar, deixando `transform` livre para a keyframe.
- **Desenho de SVG por `clip-path: inset()`** é mais confiável no Safari iOS que `stroke-dasharray` em path complexo.
- **Canvas ocioso não roda**: rAF só enquanto há partícula; passo baseado em tempo (`dt`), DPR limitado a 2, teto de partículas.
- **`contain: paint`** em camadas decorativas grandes.

Receitas prontas em [patterns.md](patterns.md).

## Armadilhas encontradas em projetos anteriores

- Bloco global de reduced motion que encurta a duração mas não zera `animation-delay`: com `fill-mode: both`, o elemento fica invisível durante todo o atraso.
- Loop infinito em propriedade que repinta (`mask-position`, `box-shadow`, `d` de SVG via SMIL, `backdrop-filter`) — custa CPU/bateria a página inteira.
- Vários mecanismos de reduced motion diferentes no mesmo projeto, cada um com uma lacuna.
- Durações e curvas copiadas como números soltos em vários arquivos.
- `BlurFade` em todos os itens: `filter: blur` é caro e, com JS lento, o conteúdo fica invisível.
- Efeito do bank com valores default — denuncia template e raramente casa com o ritmo do conceito.
- Código de animação morto (keyframes e componentes não usados) ficando no projeto.

## Quantidade

Não há número mágico. A pergunta é: o visitante consegue dizer qual é **o** momento assinatura? Se dois efeitos disputam atenção no mesmo viewport, um sai. No máximo um loop chamativo visível por vez.

## Antes de entregar

Rodar o [checklist.md](checklist.md).
