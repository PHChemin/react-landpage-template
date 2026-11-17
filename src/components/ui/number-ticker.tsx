import { useEffect, useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

import { prefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  locale?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  locale = "pt-BR",
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      const reduced = prefersReducedMotion()
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, reduced ? 0 : delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  const format = (n: number) =>
    Intl.NumberFormat(locale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(n.toFixed(decimalPlaces)))

  // The prerendered HTML carries the final number (crawlers, no-JS, reduced
  // motion). Only after hydration, and only if motion is allowed, rewind it to
  // the start so the count can play when the ticker scrolls into view.
  useLayoutEffect(() => {
    if (!ref.current || isInView) return
    if (prefersReducedMotion()) return
    ref.current.textContent = format(direction === "down" ? value : startValue)
  }, [])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [springValue, decimalPlaces, locale]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {format(direction === "down" ? startValue : value)}
    </span>
  )
}
