---
name: design-landing
description: Fluxo de direção de arte e implementação visual de landings de clientes neste template (Vite + React + Tailwind). Transforma o tema e a identidade do cliente em conceito visual, propõe direções contrastantes, implementa e verifica com prints. Usar ao personalizar o template para um cliente, criar ou refazer o visual de uma landing, quando o usuário pedir "seja criativo", ou ao aplicar feedback visual do cliente.
---

# Design de landing para cliente

Objetivo: um site que **só poderia ser deste cliente**. Criativo, nascido do tema e fiel à identidade dele — não decoração aplicada por cima, nem a página do projeto anterior com outras cores.

O cliente quase nunca sabe responder perguntas visuais. Isso é normal: **não bloqueie esperando respostas**. Infira a partir do segmento, público, região e faixa de preço, registre as premissas e proponha. O processo é tentativa e erro com o cliente; o trabalho aqui é tornar cada tentativa intencional e fácil de ajustar.

## O que é fixo e o que é livre

Leia `docs/UI_GUIDANCE.md`. Resumo:

- **Fixo (identidade do cliente):** tipografia, logo, cores da marca. Fonte ou cor de marca fora da identidade só com sugestão **validada** pelo usuário antes de entrar no código. Sem identidade tipográfica → propor e aguardar validação.
- **Invariantes:** legibilidade, contraste, contato funcionando, mobile, reduced motion, performance.
- **Livre:** estrutura da página, composição, grafismo, textura, ilustração, movimento, microcopy, cores de apoio que conversem com a marca. É aqui que a criatividade trabalha — e deve trabalhar muito.

## Fluxo

```
- [ ] 1. Ler contexto, identidade e o que já foi feito
- [ ] 2. Garimpar o universo do tema
- [ ] 3. Propor 3 direções (na conversa)
- [ ] 4. Registrar a escolhida em docs/ART_DIRECTION.md
- [ ] 5. Implementar
- [ ] 6. Verificar com prints e criticar
- [ ] 7. Entregar com apostas explícitas
```

### 1. Ler contexto

- `docs/CLIENT_BRIEF.md`, `docs/PRD.md`, `docs/ART_DIRECTION.md` (se já houver), `docs/UI_GUIDANCE.md`.
- **Identidade:** fontes, logo, cores, manual de marca. Anote o que existe e o que falta.
- **Anti-repetição:** `docs/REFERENCES.md` lista projetos anteriores. Anote estrutura, hero e momento assinatura dos últimos — a nova proposta precisa se afastar deles de propósito. O demo em `src/sections/` também não é ponto de partida: ele mostra o bank, não um layout.

Campo vazio não é bloqueio. Para cada lacuna relevante, escreva uma premissa curta ("Público: mães 30–45 do bairro, buscam confiança (a confirmar)"). Só pergunte o que for impossível inferir e mudaria tudo (ex.: o nome da marca, se existe identidade).

### 2. Garimpar o universo do tema

Antes de pensar em componente, liste o **mundo concreto** do cliente — 5 a 10 itens por linha:

- **Objetos e ferramentas** do ofício
- **Materiais e texturas** (papel, aço, farinha, couro, azulejo…)
- **Gestos e processos** (sovar, costurar, medir, polir…)
- **Lugares e luz** (balcão às 6h, consultório com janela, oficina com néon…)
- **Vocabulário e jargão** do segmento e da região
- **O que o cliente faz diferente** dos concorrentes

Escolha **uma ideia central** que vire o conceito. Ex.: confeitaria artesanal → "receita de família anotada à mão". Daí saem estrutura, textura, movimento e microcopy — e a forma de usar a tipografia da marca (escala, peso, ritmo, composição).

Pontos de partida por segmento em [theme-translation.md](theme-translation.md). São sementes, não receitas — a direção ousada deve subverter ao menos um clichê do segmento.

### 3. Propor 3 direções

Três direções **realmente diferentes** entre si — de estrutura, não só de cor:

| Direção | Papel |
| --- | --- |
| **Fiel** | O que o segmento espera, feito com capricho. Baixo risco. |
| **Ousada** | Um passo além: um elemento inesperado, mas ainda óbvio para o público. **Recomendação padrão.** |
| **Arriscada** | Aposta forte de conceito. Pode não passar, mas mostra o que é possível e destrava a conversa. |

Cada uma: conceito em uma frase, **estrutura da página** (ver abaixo), uso da tipografia e cores da identidade (+ cores de apoio com hex e motivo), o que ocupa o primeiro viewport, **momento assinatura**, componentes do bank ou autorais com o motivo, e o risco.

Apresente as três **na resposta** ao usuário (ou pergunte pela ferramenta de perguntas da sua IA, se houver) e espere a escolha. Se ele pediu para implementar direto, siga a recomendada e mencione as outras na resposta. As direções não escolhidas **não** vão para arquivo (skill `writing-docs`).

#### Estrutura não é sempre "hero + seções empilhadas"

Ideias para variar — estímulo, não lista fechada:

- **Documento**: a página é um suporte do ofício (receita, ficha de serviço, prontuário, prancha técnica, cardápio, contrato bem diagramado).
- **Narrativa de scroll**: um processo do cliente contado em etapas (da massa ao bolo, do rascunho à obra).
- **Pôster**: um único viewport forte + o resto como apêndice enxuto.
- **Índice editorial**: grade de revista, numeração, notas de margem.
- **Linha do tempo**: anos, obras, turmas.
- **Mesa de trabalho**: objetos espalhados que viram navegação.
- **Conversa**: texto em primeira pessoa, ritmo de diálogo, perguntas que o visitante faria.
- **Linktree com personalidade**: uma coluna, mas com o grafismo do ofício.

Heurísticas como "hero full-bleed" ou "poucos cards" podem ser quebradas quando a estrutura escolhida pedir — registre o motivo no `ART_DIRECTION.md`.

### 4. Registrar a escolhida

Preencher `docs/ART_DIRECTION.md` só com a direção escolhida, como estado atual. Rodadas de feedback **substituem** o que mudou no arquivo.

### 5. Implementar

Ordem:

1. Tokens em `src/styles/main.css` (`@theme` e `:root`) e fontes da identidade (`index.html` ou self-host — ver skill `seo`, Performance). Atualize `brandColor` em `src/lib/theme.ts` e `themeColor` em `src/site.config.ts`.
2. Primeiro viewport até estar forte. Depois as seções.
3. Seções em `src/sections/` seguindo a skill `building-sections`; textos em `src/content.ts`.
4. Componentes: bank (`src/components/README.md`, "Escolha por clima") **ou autoral** em `handmade/` quando o conceito pedir algo que o bank não tem — um grafismo próprio do ofício costuma valer mais que três efeitos prontos. Efeito do bank com valores default denuncia template: ajuste cor, velocidade e densidade.
5. Movimento pela skill `motion`.
6. Microcopy no tom da marca. Texto genérico ("Saiba mais", "Nossos serviços") desperdiça a chance de reforçar o conceito — e o SEO (skill `seo`).

### 6. Verificar com prints

Não entregue sem olhar:

```bash
npm run build && npm run shots     # ou: npm run dev + npm run shots -- http://localhost:5173
```

Abra os prints de `.shots/` (390px e 1440px, primeiro viewport e página inteira) e critique:

- **Teste da marca coberta:** escondendo nome e logo, dá para adivinhar o segmento? Se não, falta tema.
- **Teste da troca:** trocando só os textos, serviria para outro cliente? Se sim, está genérico.
- **Teste do projeto anterior:** lado a lado com o último projeto do `REFERENCES.md`, parecem irmãos? Se sim, mude a estrutura, não só a cor.
- **Teste do momento assinatura:** existe uma coisa que o visitante lembraria? Ela aparece cedo?
- **Teste do ruído:** algum efeito está ali só porque existe no bank? Remover.
- Invariantes de `docs/UI_GUIDANCE.md`.

Corrigir e tirar novos prints. Pelo menos uma rodada de ajuste antes de entregar.

### 7. Entregar

Resumo curto: conceito, prints (mobile e desktop), **o que é aposta** e merece validação com o cliente, e as alternativas caso ele não goste.

## Iterando com feedback do cliente

Feedback costuma ser vago ("achei sem graça", "quero mais moderno"). Traduza para mudanças concretas com [theme-translation.md](theme-translation.md) (seção "Traduzindo feedback").

- Feedback vago → mude **uma ou duas variáveis** por rodada, para descobrir o que ele realmente sente.
- "Não gostei" sem motivo → mostre uma das direções alternativas em vez de remendar a atual.
- Aprovou uma mudança → atualize `docs/ART_DIRECTION.md` para o novo estado (sem histórico).
- Projeto aprovado → sugerir ao usuário registrar em `docs/REFERENCES.md`.

## Onde arriscar e onde não

| Pode arriscar | Não negociar |
| --- | --- |
| Estrutura da página, composição do primeiro viewport | Tipografia e cores da identidade (fora delas, só validado) |
| Escala, peso e ritmo tipográfico dentro da identidade | Legibilidade e contraste |
| Textura, ilustração, grafismo autoral do segmento | Contato (WhatsApp/e-mail) visível e funcionando |
| Movimento e micro-interações com conceito | Mobile usável com o polegar |
| Microcopy com personalidade | `prefers-reduced-motion` respeitado |
| Cores de apoio que conversem com a marca | Performance (sem vídeo pesado, imagens otimizadas) |
