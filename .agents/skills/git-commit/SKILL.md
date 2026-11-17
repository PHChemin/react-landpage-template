---
name: git-commit
description: Disciplina de commits do projeto — só commitar com pedido explícito, nunca na main, inspecionar o diff, staging explícito, commits atômicos e mensagens Conventional Commits em pt-BR. Usar sempre que for preparar, dividir ou executar um commit, ou quando o usuário pedir "commita", "faz o commit", "salva no git".
---

# Commits

## 1. Regra de ouro: só com pedido explícito

> **Nunca** rode `git commit` por conta própria, ao terminar uma tarefa, "para salvar o progresso" ou porque parece o próximo passo natural. Commit só acontece quando o usuário pede com todas as letras ("faz o commit", "commita isso", "pode commitar").

Terminou a tarefa sem pedido de commit? Deixe as mudanças no working tree, resuma o que mudou e, se fizer sentido, **ofereça** a divisão em commits — sem executar.

O pedido vale para o conjunto de mudanças daquele momento. Mudanças feitas depois precisam de novo pedido.

Mesma regra para `git push`, `git commit --amend`, `git rebase`, `git reset` e qualquer comando que reescreva histórico: só com pedido explícito.

## 2. Branch protegida

Nunca commitar em `main` (é a branch que publica no Pages).

Se a branch atual for `main`:

1. Pare antes de fazer stage.
2. Avise o usuário.
3. Sugira uma branch e só crie se ele concordar:

```bash
git switch -c <tipo>/<descricao-curta>   # feat/hero-cliente, fix/menu-mobile, docs/brief
```

## 3. Inspecionar antes de fazer stage

```bash
git branch --show-current
git status
git diff
git diff --staged
```

Confirme que não vão junto:

- `.env*`, tokens, chaves, dados pessoais do cliente que não devem ir a público
- `dist/`, `node_modules/`, `.shots/`, `.originkit/`, `studio/`
- arquivos temporários, logs, prints de rascunho
- material bruto do cliente (identidade em alta, contratos)

## 4. Commits atômicos

Cada commit é **uma** mudança lógica: fácil de revisar sozinha e de reverter sem quebrar outra coisa.

- Stage explícito por arquivo (`git add src/sections/hero.tsx`) ou por trecho (`git add -p`). Nunca `git add .` / `git add -A` às cegas.
- Separe: refatoração ≠ feature ≠ ajuste de texto ≠ docs ≠ dependência.
- Mudança de dependência (`package.json` + `package-lock.json`) vai junto, no mesmo commit.
- Se o diff mistura assuntos, proponha a divisão ao usuário antes.

## 5. Mensagem — Conventional Commits em pt-BR

```
<tipo>(<escopo>): <descrição no infinitivo, minúscula, sem ponto final>

[corpo opcional: o que muda e por quê, em 1–3 linhas]
```

- Descrição em até ~72 caracteres, verbo no infinitivo: "adicionar", "corrigir", "trocar", "remover".
- Corpo descreve o estado novo e o motivo técnico — **sem** contexto de conversa, alternativas descartadas ou "conforme pedido" (skill `writing-docs`).
- Rodapé de coautoria/atribuição: siga a configuração da ferramenta e do usuário.

### Tipos

| Tipo | Quando |
| --- | --- |
| `feat` | algo novo para o visitante ou para quem usa o template |
| `fix` | correção de bug, texto errado, link quebrado |
| `refactor` | reorganização sem mudar comportamento |
| `style` | só visual/CSS sem mudar estrutura (tokens, espaçamento) |
| `perf` | performance (imagens, fontes, bundle, animação) |
| `docs` | documentação, skills, comentários |
| `chore` | configuração, scripts, manutenção |
| `deps` | adicionar/atualizar/remover dependência (ou `chore(deps)`) |
| `ci` | workflows do GitHub Actions |

### Escopos

| Escopo | Área |
| --- | --- |
| `site` | página como um todo, textos publicados |
| `sections` | `src/sections/` |
| `components` | estrutura de `src/components/`, barrels |
| `bank` | componentes de registry (`ui`, `animate-ui`, `originkit`) |
| `handmade` | efeitos autorais |
| `theme` | tokens de cor, fonte, raio em `main.css` |
| `motion` | animações, tokens de movimento |
| `content` | `src/content.ts` |
| `seo` | `site.config.ts`, plugin de SEO, robots, sitemap, OG |
| `deploy` | Pages, workflow, domínio, pré-render |
| `agents` | `AGENTS.md`, `.agents/` |
| `docs` | `docs/`, READMEs |

Exemplos:

```
feat(sections): montar o hero com a vitrine de bolos
fix(seo): trocar a URL canônica para www
style(theme): aplicar a paleta da identidade da cliente
perf(site): servir as fotos do hero em avif
docs(agents): adicionar a skill de movimento
```

## 6. Depois do commit

Mostre `git log --oneline -n <qtd>` com os commits criados. Push só se o usuário pediu (e nunca `--force` em branch que outra pessoa usa). Abrir PR segue a skill `pull-request`.
