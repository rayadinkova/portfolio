import * as React from "react"

type RevealVariant = "up" | "down"

type RevealOnEnterProps = {
    children: React.ReactNode
    className?: string
    once?: boolean
    threshold?: number
    rootMargin?: string
    variant?: RevealVariant
    delayMs?: number
}

export function RevealOnEnter({
    children,
    className = "",
    once = true,
    threshold = 0,
    rootMargin = "0px 0px 10px 0px",
    variant = "up",
    delayMs = 0,
}: RevealOnEnterProps) {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const el = ref.current
        if (!el) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once) io.disconnect()
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        io.observe(el)
        return () => io.disconnect()
    }, [once, threshold, rootMargin])

    const base = variant === "down" ? "reveal-down" : "reveal-up"
    const inClass = variant === "down" ? "reveal-down--in" : "reveal-up--in"

    return (
        <div
            ref={ref}
            className={[base, isVisible ? inClass : "", className].join(" ")}
            style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
        >
            {children}
        </div>
    )
}
