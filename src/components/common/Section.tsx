import type { ReactNode } from "react"

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
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
      {children}
    </section>
  )
}

