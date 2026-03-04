import type { CSSProperties } from "react"

type MarqueeTextProps = {
  text: string
  className?: string
  durationMs?: number
}

export function MarqueeText({
  text,
  className,
  durationMs = 9000,
}: MarqueeTextProps) {
  const style: CSSProperties & { ["--marquee-duration"]?: string } = {
    "--marquee-duration": `${durationMs}ms`,
  }

  return (
    <div className={["marquee", className ?? ""].join(" ")} style={style}>
      <div className="marquee__track" aria-label={text}>
        <span className="marquee__item">{text}</span>
        <span className="marquee__item" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}
