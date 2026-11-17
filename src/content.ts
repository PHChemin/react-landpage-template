/**
 * Textos da página. Seções leem daqui; layout não carrega texto solto.
 * Identidade e contatos ficam em `src/site.config.ts`.
 */

export const nav = [
  { href: "#servicos", id: "servicos", label: "Serviços" },
  { href: "#trabalhos", id: "trabalhos", label: "Trabalhos" },
  { href: "#sobre", id: "sobre", label: "Sobre" },
  { href: "#contato", id: "contato", label: "Contato" },
] as const

export const hero = {
  kicker: "Subtítulo / cidade",
  headline: "Headline do cliente aqui.",
  support: "Frase de apoio em uma ou duas linhas. Troque pelos textos do brief.",
  typing: ["serviço principal", "segundo diferencial", "chamada para contato"],
} as const

export const services = {
  eyebrow: "Serviços",
  title: "O que entra no primeiro scroll depois do hero.",
  intro: "Um bloco por assunto. Troque os textos e, se fizer sentido, um efeito do bank.",
  items: [
    {
      title: "Serviço principal",
      text: "Uma frase sobre o que o cliente entrega e para quem.",
    },
    {
      title: "Segundo diferencial",
      text: "O que muda na prática quando a pessoa escolhe esta marca.",
    },
    {
      title: "Como começar",
      text: "O próximo passo é uma conversa — sem formulário neste stack.",
    },
  ],
} as const

export const works = {
  eyebrow: "Trabalhos",
  title: "Portfólio em carrossel.",
  intro:
    "Cada slide aceita qualquer conteúdo: foto, vídeo ou card. As setas do teclado também navegam.",
  cta: "Quero um projeto assim",
  items: [
    { title: "Projeto um", tag: "Identidade" },
    { title: "Projeto dois", tag: "Site" },
    { title: "Projeto três", tag: "Campanha" },
    { title: "Projeto quatro", tag: "Fotografia" },
    { title: "Projeto cinco", tag: "Evento" },
  ],
} as const

export const about = {
  eyebrow: "Sobre",
  title: "Números que o cliente quer mostrar.",
  intro: "O ticker espera entrar na tela. O locale padrão é pt-BR.",
  stats: [
    { value: 12, label: "anos de ofício" },
    { value: 80, label: "projetos entregues" },
    { value: 4, label: "cidades atendidas" },
  ],
} as const

export const contact = {
  eyebrow: "Contato",
  title: "A conversa continua no WhatsApp.",
  intro: "Pages é estático: o botão é um link, não um formulário.",
  instagramHandle: "@SEU_USUARIO",
  portfolioLabel: "portfólio completo",
} as const
