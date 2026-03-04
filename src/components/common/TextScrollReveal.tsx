import * as React from "react"
import {
    useReducedMotion,
    useScroll,
    useMotionValueEvent,
} from "framer-motion"

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>

type TextScrollRevealProps = {
    text: string
    className?: string
    /**
     * Controls when the reveal starts/ends relative to viewport.
     * Must match Framer Motion's ScrollOffset format.
     */
    offset?: ScrollOffset
}

const DEFAULT_OFFSET = ["start 0.85", "end 0.35"] as const satisfies ScrollOffset

export function TextScrollReveal({
    text,
    className = "",
    offset = DEFAULT_OFFSET,
}: TextScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion()
    const ref = React.useRef<HTMLParagraphElement | null>(null)

    const words = React.useMemo(() => text.trim().split(/\s+/), [text])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset,
    })

    const [progress, setProgress] = React.useState(0)

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setProgress(v)
    })

    const revealedCount = React.useMemo(() => {
        if (prefersReducedMotion) return words.length
        const count = Math.floor(progress * words.length)
        return Math.max(0, Math.min(words.length, count))
    }, [progress, words.length, prefersReducedMotion])

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const revealed = i < revealedCount
                return (
                    <span
                        key={`${word}-${i}`}
                        className={[
                            "inline-block mr-[0.28em]",
                            "transition-all duration-300 ease-out",
                            revealed
                                ? "opacity-100 blur-0 translate-y-0 text-black"
                                : "opacity-25 blur-[1px] translate-y-[2px] text-black",
                        ].join(" ")}
                    >
                        {word}
                    </span>
                )
            })}
        </p>
    )
}
