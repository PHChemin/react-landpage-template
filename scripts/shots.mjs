// Prints de verificação em 390px e 1440px, iguais para qualquer IA ou pessoa.
//
//   npm run shots                 → build atual via `vite preview`
//   npm run shots -- <url>        → qualquer URL (ex.: http://localhost:5173 com o dev rodando)
//
// Saída em .shots/ (fora do git):
//   <largura>-fold.png  primeiro viewport, com animações rodando
//   <largura>-full.png  página inteira com reduced motion (tudo visível, sem esperar o scroll)
// Também lista erros do console (hidratação, 404 de assets, exceções).
//
// Usa Playwright sob demanda (npx), sem dependência no projeto. Primeira vez:
//   npx playwright@1.52.0 install chromium
import { spawn } from "node:child_process"
import { mkdir } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

const PLAYWRIGHT = "playwright@1.52.0"
const OUT = path.resolve(".shots")
const PREVIEW_PORT = 4173
const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "1440", width: 1440, height: 900, isMobile: false },
]

const args = process.argv.slice(2)
const inner = args.includes("--inner")
const target = args.find((arg) => /^https?:\/\//.test(arg))

if (!inner) {
  // Reexecuta dentro do `npx --package=playwright`, que baixa e deixa o pacote acessível.
  const child = spawn(
    "npx",
    ["-y", `--package=${PLAYWRIGHT}`, "--", "node", "scripts/shots.mjs", "--inner", ...args],
    { stdio: "inherit", shell: process.platform === "win32" },
  )
  child.on("exit", (code) => process.exit(code ?? 1))
} else {
  await run()
}

function loadPlaywright() {
  const bin = (process.env.PATH ?? "")
    .split(path.delimiter)
    .find((dir) => /_npx[\\/][^\\/]+[\\/]node_modules[\\/]\.bin$/.test(dir))
  if (!bin) throw new Error("Playwright não encontrado no cache do npx.")
  return createRequire(path.join(bin, "..", "playwright", "package.json"))("playwright")
}

async function waitFor(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      /* ainda subindo */
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error(`Servidor não respondeu em ${url}`)
}

async function run() {
  const { chromium } = loadPlaywright()
  let preview
  let url = target

  if (!url) {
    url = `http://localhost:${PREVIEW_PORT}/`
    preview = spawn("npx", ["vite", "preview", "--port", String(PREVIEW_PORT), "--strictPort"], {
      stdio: "ignore",
      shell: process.platform === "win32",
    })
    await waitFor(url)
  }

  await mkdir(OUT, { recursive: true })
  const problems = []
  let browser

  try {
    browser = await chromium.launch().catch((error) => {
      console.error(`\nChromium ausente. Rode uma vez: npx ${PLAYWRIGHT} install chromium\n`)
      throw error
    })
    for (const vp of VIEWPORTS) {
      for (const mode of ["fold", "full"]) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.isMobile ? 2 : 1,
          isMobile: vp.isMobile,
          hasTouch: vp.isMobile,
          reducedMotion: mode === "full" ? "reduce" : "no-preference",
        })
        const page = await context.newPage()
        page.on("console", (msg) => {
          if (msg.type() === "error" || /hydrat/i.test(msg.text())) {
            problems.push(`[${vp.name}/${mode}] console: ${msg.text()}`)
          }
        })
        page.on("pageerror", (error) => problems.push(`[${vp.name}/${mode}] erro: ${error.message}`))
        page.on("requestfailed", (req) => problems.push(`[${vp.name}/${mode}] falhou: ${req.url()}`))

        await page.goto(url, { waitUntil: "networkidle" })
        await page.waitForTimeout(mode === "fold" ? 1800 : 600)
        const file = path.join(OUT, `${vp.name}-${mode}.png`)
        await page.screenshot({ path: file, fullPage: mode === "full" })
        console.log(`✓ ${path.relative(process.cwd(), file)}`)
        await context.close()
      }
    }
  } finally {
    await browser?.close()
    preview?.kill()
  }

  if (problems.length) {
    console.log(`\nProblemas encontrados:\n  ${[...new Set(problems)].join("\n  ")}`)
    process.exitCode = 1
  } else {
    console.log("\nSem erros no console.")
  }
}
