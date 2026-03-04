import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Section } from "../../../components/common/Section"
import { TextScrollReveal } from "../../../components/common/TextScrollReveal"
import { RevealOnEnter } from "../../../components/common/RevealOnEnter"

type RevealClipProps = {
    children: React.ReactNode
    className?: string
    delaySec?: number
}

// Masked reveal: container clips, inner slides up
function RevealClip({ children, className = "", delaySec = 0 }: RevealClipProps) {
    return (
        <span className={["relative inline-block overflow-hidden align-bottom", className].join(" ")}>
            <motion.span
                className="inline-block will-change-transform"
                variants={{
                    hidden: { y: "110%", opacity: 1 },
                    show: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                            duration: 1.0,
                            delay: delaySec,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                }}
            >
                {children}
            </motion.span>
        </span>
    )
}



export function AboutSection() {
    const prefersReducedMotion = useReducedMotion()
    const sectionRef = React.useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const distance = prefersReducedMotion ? 0 : 80
    const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

    return (
        <Section id="about" className="py-10 sm:py-12 md:py-16 mt-20">
            <div
                ref={sectionRef}
                className="grid gap-8 md:grid-cols-2 md:items-start"
            >
                {/* Left: label + MOBILE image + text */}
                <div className="order-2 md:order-1">
                    {/* MYSELF (cut reveal) */}
                    <div className="text-h1 uppercase tracking-wide">
                        <RevealOnEnter variant="up">
                            <RevealClip>MYSELF</RevealClip>
                        </RevealOnEnter>
                    </div>

                    {/* Mobile image (must be here for correct order) */}
                    <div className="mt-4 md:hidden">
                        <RevealOnEnter variant="down">
                            <div className="overflow-hidden rounded-2xl">
                                <div className="h-[240px] w-full bg-black/10 sm:h-[280px]" />
                            </div>
                        </RevealOnEnter>
                    </div>

                    {/* Text */}
                    <TextScrollReveal
                        className="mt-6 text-[28px] leading-[1.08] font-semibold tracking-tight sm:text-[34px] md:text-[44px] md:leading-[1.02]"
                        text="Passionate about merging design and engineering, I craft smooth, interactive experiences with purpose. With a focus on motion, performance, and detail, I help bring digital products to life for forward-thinking companies around the world."
                    />
                </div>

                {/* Right: DESKTOP image only */}
                <div className="order-1 md:order-2 md:justify-self-end">
                    <div className="hidden md:block">
                        <motion.div style={{ y }} className="will-change-transform">
                            <div className="h-[360px] w-[640px] rounded-2xl bg-black/10" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
