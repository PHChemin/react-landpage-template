---
name: writing-docs
description: Regras para escrever qualquer texto versionado — docs/, READMEs, AGENTS.md, comentários de código, src/content.ts, src/site.config.ts e corpo de commits e PRs. Registra só o estado atual como fato; proíbe contexto de conversa, alternativas descartadas e histórico de decisão. Usar sempre que criar ou editar esses arquivos, ao preencher brief/PRD/direção de arte, ou ao registrar uma decisão tomada com o usuário ou o cliente.
---

# Documentação: só o estado atual

Tudo que é versionado vai para o GitHub e, em parte, para o site no ar. Conversa, rascunho e decisões descartadas ficam **no chat**; o histórico já existe no git. O arquivo diz **como as coisas são agora**.

## A regra

Escreva a decisão vigente como fato, do jeito que ficaria se ela sempre tivesse sido assim.

| Errado | Certo |
| --- | --- |
| Amarelo, não o vermelho discutido | Cor de acento: amarelo `#F2C230` |
| Conforme conversado, o hero terá foto | Hero: foto da fachada em tela cheia |
| O cliente preferiu Lora em vez de Playfair | Display: Lora |
| Na rodada 2 trocamos o CTA para "Agendar" | CTA principal: "Agendar conversa" |
| A IA sugeriu usar NumberTicker | Números de prova: `NumberTicker` |
| ~~Direção A~~ / ~~Direção C~~ (riscadas) | Só a direção escolhida |
| Atualização 12/03: removido o marquee | (o marquee simplesmente não aparece) |

## Proibido em texto versionado

- Alternativas recusadas ou comparação com elas ("em vez de", "e não", "descartamos", "recusado").
- Referência à conversa: "conforme conversado", "como pedido", "o cliente disse", "ficou decidido", "após análise".
- Rodadas, versões e datas de reunião ("v2", "rodada 3", "na call de terça").
- Quem sugeriu: "a IA", nome de ferramenta ou modelo (Claude, Cursor, ChatGPT…), "o designer achou".
- Raciocínio de bastidor, dúvidas abertas em tom de conversa, "TODO: ver com o cliente" em arquivo público.
- Seções de histórico/changelog em docs de projeto.
- Dados pessoais do cliente que não vão a público (CPF, endereço residencial, valores de contrato). O repo e o site podem ser públicos.

## O porquê, quando cabe

Motivo entra só se orienta quem mexer depois, é atemporal e não cita a opção descartada:

- ✅ `Amarelo #F2C230 — cor da fachada e das embalagens.`
- ❌ `Amarelo, porque o vermelho ficou agressivo.`

## Decisão mudou? Substitua

Edite o trecho para o novo estado. Não acrescente "atualização", não risque o antigo, não mantenha os dois.

## Premissas

Informação inferida e ainda não confirmada entra como afirmação marcada, sem narrativa:

```md
- Público: mulheres 30–45 do bairro (a confirmar)
```

Confirmou → tira a marca. Mudou → reescreve.

## Onde a exploração acontece

Direções A/B/C, comparações de paleta, prós e contras, feedback do cliente: na **resposta** ao usuário. Escolhido, o doc recebe só o resultado.

## Comentários de código

Explicam o porquê não óbvio do código **como ele é**: restrição técnica, armadilha de navegador, contrato com outro arquivo. Nada de "mudei isso porque…", "antes era…", "pedido do cliente".

## Commits e PRs

O corpo descreve o estado novo e o motivo técnico. A mensagem de commit é o único lugar onde "o que mudou" é natural — mesmo assim, sem citar conversa nem opções descartadas.

## Conferência antes de salvar

Procure termos-gatilho nos arquivos alterados e reescreva o que for contexto de conversa:

```bash
grep -rniE "não o |nao o |em vez de|ao invés|descart|recus|conforme|conversa|combinad|rodada|sugeri|preferiu|ficou decidido|\bv[0-9]\b|claude|cursor|chatgpt|gpt|\bIA\b" docs README.md src/content.ts src/site.config.ts
```

Nem todo resultado é erro ("conversa" pode ser o CTA do site) — leia cada um.
