# Checklist de movimento

## Propósito

- [ ] Dá para apontar o momento assinatura e ele vem do conceito do cliente
- [ ] Cada animação conta, orienta ou responde — nenhuma está ali só porque existe no bank
- [ ] Efeitos do bank com cor, velocidade e densidade ajustadas
- [ ] No máximo um loop chamativo visível por viewport

## Técnica

- [ ] Só `transform`/`opacity` (ou `translate`/`rotate`/`scale`) em movimento contínuo
- [ ] Durações e curvas pelos tokens de `main.css`
- [ ] Um mecanismo de stagger na página
- [ ] Entrada no wrapper, interação no filho
- [ ] Loops pausam fora da tela / aba oculta
- [ ] Sem `setState` por frame; sem listener de scroll para efeito que o CSS resolve
- [ ] Cleanup em todo efeito com listener, timer, observer ou rAF
- [ ] Nenhuma keyframe, classe ou componente de animação sem uso

## Acessibilidade e robustez

- [ ] Reduced motion: emulado no DevTools, nada some nem espera atraso
- [ ] JS desligado: todo o conteúdo aparece
- [ ] Hover espelhado em `:focus-visible`; nada essencial só no hover
- [ ] Marquee/loop > 5s com pausa ou decorativo e `aria-hidden`
- [ ] Nada pisca mais de 3×/s
- [ ] `npm run shots` sem erro de hidratação

## Performance

- [ ] DevTools → Performance: rolar a página sem quedas longas de frame no celular (CPU 4× slowdown)
- [ ] Sem `blur`/`backdrop-filter` em área grande animada
- [ ] Hero aparece antes do JS (entrada por CSS, não por motion)
