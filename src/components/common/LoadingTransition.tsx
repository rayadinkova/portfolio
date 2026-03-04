import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

type LoadingTransitionProps = {
    count: number
    onDone: () => void
    holdMs?: number
}

type Phase = "counting" | "exitNumber" | "holdWhite" | "revealApp"

export function LoadingTransition({
    count,
    onDone,
    holdMs = 100,
}: LoadingTransitionProps) {
    const prefersReducedMotion = useReducedMotion()
    const [phase, setPhase] = React.useState<Phase>("counting")

    const startedRef = React.useRef(false)
    const t1Ref = React.useRef<number | null>(null)
    const t2Ref = React.useRef<number | null>(null)
    const t3Ref = React.useRef<number | null>(null)

    React.useEffect(() => {
        // Clear timers on unmount only
        return () => {
            if (t1Ref.current) window.clearTimeout(t1Ref.current)
            if (t2Ref.current) window.clearTimeout(t2Ref.current)
            if (t3Ref.current) window.clearTimeout(t3Ref.current)
        }
    }, [])

    React.useEffect(() => {
        if (count < 100) return
        if (startedRef.current) return
        startedRef.current = true

        const exitMs = prefersReducedMotion ? 0 : 450 // "100" exits
        const hold = prefersReducedMotion ? 0 : holdMs // white hold
        const revealMs = prefersReducedMotion ? 0 : 450 // overlay fade out

        // 1) 100 slides up and disappears
        setPhase("exitNumber")

        // 2) white screen holds briefly
        t1Ref.current = window.setTimeout(() => {
            setPhase("holdWhite")
        }, exitMs)

        // 3) white overlay fades out
        t2Ref.current = window.setTimeout(() => {
            setPhase("revealApp")
        }, exitMs + hold)

        // 4) app fades in (BootGate handles app fade-in), after overlay fade completes
        t3Ref.current = window.setTimeout(() => {
            onDone()
        }, exitMs + hold + revealMs)
    }, [count, holdMs, onDone, prefersReducedMotion])

    const showNumber = phase === "counting" || phase === "exitNumber"

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "revealApp" ? 0 : 1 }}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                ease: "easeInOut",
            }}
        >
            <div className="grid h-full w-full place-items-center">
                <AnimatePresence mode="wait">
                    {showNumber && (
                        <motion.div
                            key="loader-number"
                            initial={{ opacity: 1, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{
                                duration: prefersReducedMotion ? 0 : 0.45,
                                ease: "easeInOut",
                            }}
                            className="text-[14px] font-medium tracking-tight text-black"
                        >
                            {Math.min(count, 100)}
                        </motion.div>
                    )}

                    {(phase === "holdWhite" || phase === "revealApp") && (
                        <div key="hold-white" />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
