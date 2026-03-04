import type { ReactNode } from "react"

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  /**
   * If your navbar is fixed, this prevents anchor jumps from hiding the section title under the navbar.
   * Adjust these values later if your navbar height changes.
   */
  scrollOffsetClassName?: string
}

export function Section({
  id,
  children,
  className,
  scrollOffsetClassName = "scroll-mt-24 md:scroll-mt-28",
}: SectionProps) {
  return (
    <section id={id} className={`${scrollOffsetClassName} ${className ?? ""}`}>
      {/* Layout wrapper: consistent page padding + vertical spacing */}
      {children}
    </section>
  )
}
