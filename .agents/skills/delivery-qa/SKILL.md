---
name: delivery-qa
description: Verificação antes de entregar ou publicar uma landing deste template — build, prints 390/1440, links de contato, placeholders, SEO, movimento, acessibilidade, performance e domínio. Usar quando o usuário disser que vai entregar, publicar, mostrar ao cliente, ou pedir uma revisão final/QA.
---

# QA de entrega

Rode na ordem. Reporte ao usuário o que passou, o que falhou e o que depende dele ou do cliente — sem marcar como ok o que não foi verificado.

## 1. Build e console

```bash
npm run build      # sem erro; avisos [seo] só se forem conhecidos
npm run shots      # prints em .shots/ + erros do console
```

Abrir e **olhar** os quatro prints (`390-fold`, `390-full`, `1440-fold`, `1440-full`). `npm run shots` precisa terminar com "Sem erros no console".

## 2. Conteúdo

- [ ] Nenhum placeholder em `src/site.config.ts` e `src/content.ts` (o build lista os conhecidos; procure também `Lorem`, `example.com`, `SEU_`, `XXXX`)
- [ ] Textos revisados (ortografia, acentos, nomes próprios, registro profissional)
- [ ] Docs sem contexto de conversa (skill `writing-docs`)
- [ ] Imagens reais do cliente, otimizadas (`webp`/`avif`), com `alt`

## 3. Contato

- [ ] WhatsApp abre a conversa certa, com a mensagem pronta
- [ ] `mailto:` com o e-mail certo
- [ ] Redes abrem o perfil oficial
- [ ] CTA principal visível no primeiro viewport em 390px e alcançável com o polegar

## 4. Visual e identidade

- [ ] Tipografia e cores da identidade do cliente (nada fora dela sem validação)
- [ ] Testes de `design-landing`: marca coberta, troca, momento assinatura, ruído
- [ ] Invariantes de `docs/UI_GUIDANCE.md`

## 5. Movimento e acessibilidade

- [ ] [Checklist de movimento](../motion/checklist.md)
- [ ] Navegação só por teclado: skip link, foco visível, menu mobile abre/fecha, ordem lógica
- [ ] Contraste AA
- [ ] JS desligado: conteúdo visível

## 6. SEO e compartilhamento

- [ ] Passo 8 ("Validar") da skill `seo`
- [ ] `public/og-image.png` 1200×630 existe e aparece no preview do WhatsApp

## 7. Performance

PageSpeed Insights (mobile) na URL publicada ou Lighthouse no `npm run preview`:

- [ ] Performance ≥ 90, LCP < 2,5s, CLS < 0,1
- [ ] Acessibilidade, Práticas recomendadas e SEO ≥ 90

## 8. Publicação

- [ ] Settings → Pages → Source = GitHub Actions; último workflow verde
- [ ] Domínio configurado, DNS ok, **Enforce HTTPS** marcado
- [ ] `site.url` no config = domínio final; `/robots.txt` e `/sitemap.xml` respondem
- [ ] Search Console e Google Business Profile: orientação passada ao cliente (skill `seo`, passo 7)

## 9. Registro

Projeto aprovado → sugerir ao usuário registrar em `docs/REFERENCES.md` do template (conceito, o que funcionou, técnica reutilizável).
