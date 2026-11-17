/** Caminho de um arquivo de `public/` respeitando o `base` do Vite (domínio próprio ou /repo/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
