import { motion } from "framer-motion"
import { InteractiveHoverButton } from "../common/InteractiveHoverButton"

type RevealClipProps = {
    children: React.ReactNode
    className?: string
    delaySec?: number
}

// Same reveal effect as Intro (kept local so IntroSection can stay clean)
function RevealClip({ children, className = "", delaySec = 0 }: RevealClipProps) {
    return (
        <span className={["relative inline-block overflow-hidden align-bottom", className].join(" ")}>
            <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%", opacity: 1 }}
                animate={{
                    y: "0%",
                    opacity: 1,
                    transition: {
                        duration: 1.0,
                        delay: delaySec,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
            >
                {children}
            </motion.span>
        </span>
    )
}

export function HomeStickyHeader() {
    return (
        <div
            className={[
                "fixed top-0 left-0 right-0 z-50 ",
                "bg-transparent"
            ].join(" ")}
        >
            {/* Match your Section horizontal padding if you have one */}
            <div className="mx-auto w-full px-6 py-6 md:px-8">
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <div className="text-h1 leading-[1.05] md:text-h1">
                            <RevealClip>EU Based</RevealClip>
                        </div>
                        <div className="text-h1 leading-[1.05] text-black/50 md:text-h1">
                            <RevealClip delaySec={0.45}>Working globally</RevealClip>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <RevealClip delaySec={0.08}>
                            <InteractiveHoverButton href="mailto:your@email.com" className="shrink-0">
                                Get in touch
                            </InteractiveHoverButton>
                        </RevealClip>
                    </div>
                </div>
            </div>
        </div>
    )
}
