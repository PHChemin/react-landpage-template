# Receitas de movimento

Pontos de partida. Troque ritmo, distância e curva pelo conceito do cliente.

## Entrada no scroll com stagger

```tsx
import { Reveal } from "@/components/site"

{items.map((item, i) => (
  <Reveal as="li" key={item.id} index={i}>
    <Card {...item} />
  </Reveal>
))}
```

`Reveal` usa um `IntersectionObserver` compartilhado, anima `opacity` + `translateY`, só esconde quando `html.js` existe e mostra direto com reduced motion. Para outro gesto (escala, máscara), crie uma classe irmã de `.reveal` em `main.css` mantendo o `.js` no seletor.

## Sequência do hero só com CSS (não espera o JS)

```css
.hero-in {
  animation: hero-in var(--duration-slow) var(--ease-out-soft) both;
  animation-delay: calc(var(--i, 0) * 120ms + 150ms);
}
@keyframes hero-in {
  from { opacity: 0; translate: 0 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-in { animation-name: fade-in; animation-duration: var(--duration-fast); }
}
@keyframes fade-in { from { opacity: 0; } }
```

```tsx
<p className="hero-in" style={{ "--i": 0 } as CSSProperties}>{site.name}</p>
<h1 className="hero-in" style={{ "--i": 1 } as CSSProperties}>{hero.headline}</h1>
```

## Movimento ligado ao scroll (CSS scroll-driven)

```css
.parallax-slow { translate: 0 0; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .parallax-slow {
      animation: drift linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
  }
}
@keyframes drift {
  from { translate: 0 40px; }
  to   { translate: 0 -40px; }
}
```

Sem suporte, o elemento fica parado no lugar — que é o estado correto. Nada de listener de scroll com `setState` por frame.

## Desenho de traço SVG

```css
.draw-line {
  clip-path: inset(0 100% 0 0);
}
.is-visible .draw-line {
  clip-path: inset(0 0 0 0);
  transition: clip-path var(--duration-scene) var(--ease-in-out-soft);
}
@media (prefers-reduced-motion: reduce) {
  .draw-line { clip-path: none; }
}
```

Disparado pelo `Reveal` pai (`.is-visible`). Para desenho que segue o caminho, `pathLength="1"` + `stroke-dasharray: 1; stroke-dashoffset: 1 → 0` funciona em paths simples.

## Loop orgânico dessincronizado

```css
.sway {
  rotate: var(--r, 0deg);
  animation: sway var(--dur, 8s) var(--ease-in-out-soft) var(--delay, 0s) infinite alternate;
}
@keyframes sway {
  to { transform: translateY(-6px) rotate(3deg); }
}
@media (prefers-reduced-motion: reduce) {
  .sway { animation: none; }
}
```

```tsx
// valores determinísticos (pré-render): derive do índice, não de Math.random()
style={{ "--dur": `${7 + (i % 3)}s`, "--delay": `${-i * 1.3}s`, "--r": `${(i % 2 ? 1 : -1) * 4}deg` } as CSSProperties}
```

Com muitos itens, pausar fora da tela: `animation-play-state: paused` até um observer adicionar a classe que libera.

## Hover de CTA com foco e press

```css
.cta {
  transition: translate var(--duration-fast) var(--ease-out-soft),
              background-color var(--duration-fast) ease;
}
.cta:hover, .cta:focus-visible { translate: 0 -2px; }
.cta:active { scale: 0.98; transition-duration: var(--duration-instant); }
```

Preenchimento que "sobe" no hover: `::before` com `scale: 1 0 → 1 1` e `transform-origin: bottom` — não anime `mask-position` em loop.

## Gesto e layout com motion/react

```tsx
import { AnimatePresence, motion } from "motion/react"

<AnimatePresence mode="wait">
  <motion.div
    key={tab}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.28, ease: [0.22, 0.8, 0.24, 1] }}
  />
</AnimatePresence>
```

Use quando há saída de elemento, `layout`/`layoutId`, arraste ou spring. Valor que muda a cada frame vai em `useMotionValue`/`useTransform`, nunca em `useState`.

## Contador

`NumberTicker` (`@/components/ui`) já sai no HTML com o valor final e só rebobina depois da hidratação, se o movimento estiver liberado. Contador próprio deve seguir a mesma regra.

## Canvas de partículas

Modelo: `src/components/handmade/click-effects.tsx`.

- rAF só enquanto há partícula viva.
- Passo por tempo: `const dt = Math.min((now - last) / 1000, 0.05)`.
- `devicePixelRatio` limitado a 2; teto de partículas.
- Pausa com `document.hidden` e fora da tela.
- Config em `ref`, para não recriar listeners a cada prop.
- `prefersReducedMotion()` checado no disparo.
- Canvas com `aria-hidden` e `pointer-events: none`.
