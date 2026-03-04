import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Section } from "../../../components/common/Section"

type ServiceItem = {
    number: string
    title: string
    description: string
    tags: string[]
}

const SERVICES: ServiceItem[] = [
    {
        number: "01",
        title: "Brand Design",
        description:
            "Helping brands shape meaningful identities by aligning research, messaging, and creative direction into a clear and cohesive identity.",
        tags: [
            "REASEARCH & INSIGHTS",
            "COMPETITIVE STUDY",
            "VOICE & TONE",
            "NAMING & COPYWRITING",
            "PHOTOGRAPHY & EDITING",
        ],
    },
    {
        number: "02",
        title: "Digital Design",
        description:
            "Designing engaging digital experiences that combine brand strategy and creativity with UX insights to deliver functionality and ease of use.",
        tags: [
            "IDENTITY DESIGN",
            "LOGO DESIGN",
            "WIREFRAMING",
            "DESIGN SYSTEM",
            "UI",
            "UX",
            "WEB DESIGN",
            "GRAPHIC DESIGN",
        ],
    },
    {
        number: "03",
        title: "Development",
        description:
            "Building digital services that combine design, technology, and business strategy to deliver seamless user experiences.",
        tags: ["FRONTEND DEVELOPMENT", "MOTION", "ANIMATION", "DATA MODELING"],
    },
]

type RevealProps = {
    children: React.ReactNode
    delay?: number
    className?: string
}

/** Bottom -> top reveal for ALL text elements */
function RevealUp({ children, delay = 0, className = "" }: RevealProps) {
    const prefersReducedMotion = useReducedMotion()

    if (prefersReducedMotion) return <div className={className}>{children}</div>

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    )
}

/** Top -> bottom reveal for the image boxes */
function RevealDown({ children, delay = 0, className = "" }: RevealProps) {
    const prefersReducedMotion = useReducedMotion()

    if (prefersReducedMotion) return <div className={className}>{children}</div>

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    )
}

export function ServicesSection() {
    return (
        <Section id="services" className="mt-10 py-0 md:py-0">

            {/* OUTER dark container (matches Figma: header + inner card live inside the same dark block) */}
            <div
                className={[
                    "rounded-3xl",
                    "bg-black/90",
                    "px-5 py-10 md:px-8 md:py-14",
                    "text-white",
                ].join(" ")}
            >


                {/* Header (inside the dark container now) */}
                <div className="mx-auto w-full">
                    <RevealUp
                        delay={0.0}
                        className="text-[12px] tracking-[0.18em] uppercase text-white/60"
                    >
                        SERVICES
                    </RevealUp>

                    <RevealUp
                        delay={0.06}
                        className={[
                            "mt-3 max-w-[920px]",
                            "text-[26px] leading-[1.15] font-semibold text-white",
                            "md:text-[36px] md:leading-[1.1]",
                        ].join(" ")}
                    >
                        Evolving with every built, my process spans design, development, and brand strategy - aligning
                        vision with execution to bring clarity and edge to every project.
                    </RevealUp>
                </div>

                {/* INNER lighter container (the big light-ish panel that holds the 3 service rows) */}
                <div className="mt-10 rounded-3xl bg-white/10">
                    <div className="px-5 py-6 md:px-8 md:py-8">
                        {SERVICES.map((s, i) => {
                            const base = 0.08 * i

                            return (
                                <div key={s.number} className={i === 0 ? "" : "mt-8 md:mt-10"}>


                                    {/* Row */}
                                    <div
                                        className={[
                                            "relative", // creates a local stacking context anchor
                                            "grid gap-6",
                                            "min-w-0",
                                            "md:items-start",
                                            "md:grid-cols-[44px_180px_minmax(0,1fr)_620px]",
                                        ].join(" ")}
                                    >
                                        {/* Number */}
                                        <RevealUp delay={0.02 + base} className="text-white/60 text-[14px] font-medium">
                                            {s.number}
                                        </RevealUp>

                                        {/* Title */}
                                        <RevealUp delay={0.06 + base} className="text-[22px] font-semibold leading-[1.1]">
                                            {s.title}
                                        </RevealUp>

                                        {/* Description + tags */}
                                        <div className="min-w-0">
                                            <RevealUp
                                                delay={0.10 + base}
                                                className="max-w-[520px] text-white/85 text-[14px] leading-[1.45]"
                                            >
                                                {s.description}
                                            </RevealUp>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {s.tags.map((t, idx) => (
                                                    <RevealUp
                                                        key={`${s.number}-${t}`}
                                                        delay={0.14 + base + idx * 0.02}
                                                        className={[
                                                            "inline-flex",
                                                            "rounded-full bg-white/10 px-3 py-2",
                                                            "text-[12px] tracking-[0.08em] uppercase text-white/90",
                                                        ].join(" ")}
                                                    >
                                                        {t}
                                                    </RevealUp>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Image placeholder: simple LIGHT GREY div (as requested) + top->bottom reveal */}
                                        <RevealDown>
                                            <div
                                                className={[
                                                    "block",
                                                    "rounded-2xl",
                                                    "w-full",
                                                    "h-[160px] md:h-[140px]",
                                                    "md:w-[320px] md:max-w-[320px]",
                                                    "shrink-0",
                                                ].join(" ")}
                                                style={{ backgroundColor: "#D9D9D9" }}
                                            />
                                        </RevealDown>
                                    </div>



                                    {/* Divider (except after last) */}
                                    {i !== SERVICES.length - 1 && (
                                        <div className="mt-8 md:mt-10 h-px w-full bg-white/12" />
                                    )}


                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Section>
    )
}
