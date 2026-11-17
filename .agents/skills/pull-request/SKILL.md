---
name: pull-request
description: Como abrir, atualizar e (só quando pedido e confirmado) fazer merge de pull requests no GitHub — branch, push, título e corpo com resumo e o que foi feito por área. Merge é proibido sem pedido explícito e exige confirmação antes de executar. Usar quando o usuário pedir para abrir/criar/atualizar uma PR, revisar uma PR, ou falar em merge.
---

# Pull requests

## Regras invioláveis

1. **Abrir PR só com pedido explícito.** Terminar uma tarefa não é pedido.
2. **Merge: PROIBIDO sem pedido explícito do usuário.** "Abre a PR", "pode subir", "manda pro GitHub" e "está ótimo" **não** são pedido de merge. Só vale algo como "faz o merge", "pode mergear", "merge na main".
3. **Mesmo com pedido, confirme antes de executar.** Pergunte e espere o "sim":

   > Confirma o merge da PR #N (`<branch>` → `main`) via **<squash | merge | rebase>**? Isso publica o site no GitHub Pages. A branch `<branch>` será mantida (posso apagar depois, se quiser).

   Resposta ambígua ou nova pergunta → não executa; esclareça.
4. A confirmação vale para aquela PR naquele momento. Outra PR, ou novos commits depois da confirmação, pedem nova confirmação.
5. Nunca: `gh pr merge --admin`, pular checks pendentes ou falhando, `--force` em `main`, apagar branch remota sem pedido, aprovar a própria PR.

## Abrir uma PR

### 1. Conferir

```bash
git branch --show-current     # nunca abrir a partir da main
git status                    # nada pendente que deveria ir junto
git log --oneline main..HEAD  # commits que entram
```

Se há mudanças não commitadas que pertencem à PR, siga a skill `git-commit` (que também exige pedido explícito).

### 2. Push da branch

```bash
git push -u origin <branch>
```

Push na própria branch de trabalho é parte de "abrir a PR". Sem `--force`; se o remoto divergiu, pare e pergunte.

### 3. Criar

```bash
gh pr create --base main --head <branch> --title "<título>" --body-file <arquivo>
```

- **Título**: mesmo formato dos commits — `feat(sections): montar o hero com a vitrine de bolos`. Várias mudanças → o tipo/escopo dominante.
- **Corpo**: seguir `.github/pull_request_template.md`, em pt-BR — resumo curto e "O que foi feito" dividido por área, com tópicos claros. Blocos que não se aplicam saem. Sem prints nem roteiro de teste.
- O corpo descreve o estado novo — sem contexto de conversa nem alternativas descartadas (skill `writing-docs`).
- Rodapé de atribuição: siga a configuração da ferramenta e do usuário.

### 4. Entregar

Responder com o link da PR e um resumo de 2–3 linhas. **Não** perguntar "posso fazer o merge?" — o usuário pede quando quiser.

## Atualizar uma PR

- Novos commits na mesma branch + `git push` (com pedido de commit, conforme `git-commit`).
- Corpo desatualizado → `gh pr edit <n> --body-file <arquivo>`, reescrevendo para o estado atual (não anexar "atualização:").

## Merge (só após pedido + confirmação)

1. `gh pr view <n> --json state,mergeable,statusCheckRollup` — checks verdes e sem conflito. Se não, reporte e pare.
2. Fazer a pergunta de confirmação acima e esperar.
3. Executar com o método confirmado:

   ```bash
   gh pr merge <n> --squash      # ou --merge / --rebase, conforme confirmado
   ```

4. Reportar o resultado e o link do workflow de deploy (`gh run list --workflow deploy.yml -L 1`).
5. Apagar a branch só se o usuário pedir.

Padrão sugerido quando o usuário não tiver preferência: `--squash` (um commit por PR na `main`).
