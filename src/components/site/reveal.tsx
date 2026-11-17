import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react"

import { prefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Posição na sequência: atrasa `index × --stagger` (padrão 80ms). */
  index?: number
  /** Atraso extra em ms, somado ao do `index`. */
  delay?: number
}

let shared: IntersectionObserver | null = null

/** Um observer para todos os Reveal da página; cada alvo sai da lista ao aparecer. */
function observe(el: Element) {
  shared ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("is-visible")
        shared?.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  )
  shared.observe(el)
  return () => shared?.unobserve(el)
}

/**
 * Entrada no scroll (opacity + translate, sem blur).
 * O estado escondido só vale com JS (`html.js`): no pré-render, sem JS e com
 * reduced motion o conteúdo aparece direto. Animação fica no wrapper — efeitos
 * de hover/press vão no filho, para não brigar pelo `transform`.
 */
export function Reveal({ children, className, as: Tag = "div", index, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible")
      return
    }
    return observe(el)
  }, [])

  const style = {
    ...(index !== undefined && { "--i": index }),
    ...(delay > 0 && { "--reveal-delay": `${delay}ms` }),
  } as CSSProperties

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  )
}
