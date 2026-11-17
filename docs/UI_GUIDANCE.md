# UI Guidance

Diretrizes visuais das landings deste template. Leia junto com `PRD.md` e `ART_DIRECTION.md` do cliente. O processo completo está na skill `.agents/skills/design-landing/`.

O site deve **só poder ser deste cliente**. Por isso as regras têm três camadas: o que nunca muda, o que costuma funcionar e o que é livre. A maior parte do trabalho criativo acontece na terceira.

## 1. Invariantes — sempre

**Identidade do cliente**
- Tipografia, logo e cores da marca são as da identidade visual do cliente.
- Fonte ou cor de marca fora da identidade só entra se for sugerida e **validada** pelo usuário antes de ir para o código.
- Cliente sem identidade tipográfica: propor o par (display + corpo) com o motivo e aguardar validação.

**Uso**
- Hierarquia legível no primeiro viewport: quem é, o que faz, como falar com ele.
- Contraste AA (4.5:1 texto, 3:1 texto grande e ícones de ação).
- Contato (WhatsApp, e-mail, redes) visível cedo e funcionando; alvo de toque ≥ 44px; CTA principal alcançável com o polegar no mobile.
- Funciona de 360px a 1920px sem rolagem horizontal.

**Técnica**
- `prefers-reduced-motion` respeitado; conteúdo visível sem JS (skill `motion`).
- Performance: LCP < 2,5s no mobile, imagens otimizadas, sem vídeo pesado (skill `seo`).
- Semântica: um `h1`, seções com `h2`, textos em HTML (skills `building-sections` e `seo`).

## 2. Heurísticas — padrão que se quebra com motivo

Valem quando nada no conceito pede outra coisa. Quebrar de propósito é bem-vindo: registre o motivo em `ART_DIRECTION.md` ("Estrutura").

- Primeiro viewport com **uma** composição: marca + headline + apoio + CTA + visual dominante.
- Marca em primeiro plano: sem o nav, ainda dá para saber de quem é o site.
- Hero de borda a borda, sem cards flutuando por cima.
- Uma função por seção.
- Poucos cards; preferir tipografia, espaço e grafismo a caixas com sombra e pílulas.
- Um momento assinatura por página, visível cedo.
- Subverter um clichê do segmento.
- Efeitos do bank com cor, velocidade e densidade ajustadas; valores default denunciam template.
- Evitar estéticas genéricas de IA/dashboard: gradiente roxo com glow, chips flutuantes, grade de três cards com ícone como estrutura da página inteira.

## 3. Território livre — onde a criatividade trabalha

Sem receita. Saia do conceito do cliente, não do demo nem do último projeto (`REFERENCES.md`).

- **Estrutura da página**: documento, narrativa de scroll, pôster, índice editorial, linha do tempo, mesa de trabalho, conversa… (ideias na skill `design-landing`).
- **Composição**: assimetria, sobreposição, grids quebrados, escala extrema, texto como imagem.
- **Uso da tipografia da marca**: escala, peso, caixa, tracking, ritmo, alinhamentos.
- **Cores de apoio** que conversem com a marca, texturas, ilustração, fotografia, grafismo autoral (`src/components/handmade/`).
- **Movimento** com conceito (skill `motion`).
- **Microcopy** com voz: botões e títulos no tom da marca, não "Saiba mais" / "Nossos serviços".
- **Componentes**: o bank é ponto de partida; componente autoral feito para este cliente costuma valer mais que três efeitos prontos.

## Tokens

- Cores e raio: `:root` em `src/styles/main.css` (`--primary`, `--background`…); cor de canvas em `brandColor` (`src/lib/theme.ts`).
- Fontes: `--font-display`, `--font-sans`, `--font-mono` em `@theme`; carregamento no `index.html` ou self-host.
- Movimento: `--duration-*`, `--ease-*`, `--stagger`.

## Kits de UI

- Escolha pelo conceito em `src/components/README.md` ("Escolha por clima").
- Não espalhe o bank inteiro pela página.

## Checklist antes de entregar

Verificar com `npm run shots` (390px e 1440px), não de cabeça.

- [ ] Invariantes atendidos
- [ ] Teste da marca coberta: sem nome/logo, dá para adivinhar o segmento
- [ ] Teste da troca: trocando só os textos, **não** serviria para outro cliente
- [ ] Teste do projeto anterior: não parece irmão do último projeto
- [ ] Momento assinatura presente e visível cedo
- [ ] Heurística quebrada tem motivo registrado
- [ ] Nenhum efeito só porque existe no bank
