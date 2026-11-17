import { site } from "@/site.config"

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
      <p>
        <span className="font-mono">{site.name}</span> ·{" "}
        {/* O HTML pré-renderizado traz o ano do build; na virada do ano o cliente pode divergir. */}
        <span suppressHydrationWarning>{year}</span>
      </p>
    </footer>
  )
}
