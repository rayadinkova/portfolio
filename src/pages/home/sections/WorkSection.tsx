import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Section } from "../../../components/common/Section"
import { MarqueeText } from "../../../components/common/MarqueeText"
import { NavLink } from "react-router-dom"
import { RevealOnEnter } from "../../../components/common/RevealOnEnter"
import workImage1 from "../../../assets/ui/images/work-1.jpg"
import workImage2 from "../../../assets/ui/images/work-2.jpg"

type RevealClipProps = {
    children: React.ReactNode
    className?: string
    delaySec?: number
}

function RevealClip({ children, className = "", delaySec = 0 }: RevealClipProps) {
    return (
        <span
            className={[
                "relative inline-block overflow-hidden align-bottom leading-[1.05]",
                className,
            ].join(" ")}
        >
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

type Project = {
    id: string
    title: string
    category: string
    year: string
    techMarquee: string
    imageSrc: string
    imageAlt: string
}

const PROJECTS: Project[] = [
    {
        id: "jazmin-wong",
        title: "JAZMIN WONG",
        category: "PORTFOLIO",
        year: "2025",
        techMarquee:
            "MOTION, MATTER.JS, LENIS, VERCEL, ART DIRECTION, VOICE & TONE, UI, UX, NEXT.JS, TAILWIND CSS, GSAP,",
        imageSrc: workImage1,
        imageAlt: "Jazmin Wong project preview",
    },
    {
        id: "trackstack",
        title: "TRACKSTACK",
        category: "PRODUCT",
        year: "2025",
        techMarquee:
            "WEB DESIGN, PRODUCT DESIGN, MEDIA PRODUCTION, ART DIRECTION, NAMING & COPYWRITING,",
        imageSrc: workImage2,
        imageAlt: "Trackstack project preview",
    },
]

export function WorkSection() {
    return (
        <Section id="work" className="mt-20 py-10 md:py-16">
            {/* Heading row */}
            <div className="flex items-start justify-between">
                <div className="md:text-[144px] text-[44px] uppercase font-bold tracking-tight leading-[0.9]">
                    <RevealOnEnter variant="up">
                        <RevealClip>WORK</RevealClip>
                    </RevealOnEnter>
                </div>

                <div className=" md:text-[144px] text-[44px] uppercase font-bold tracking-tight leading-[0.9]">
                    <RevealOnEnter variant="up">
                        <RevealClip delaySec={0.06}>&apos;25</RevealClip>
                    </RevealOnEnter>

                </div>
            </div>

            {/* Cards */}
            <div className="mt-4 grid gap-6 md:grid-cols-2">
                {PROJECTS.map((p, idx) => (
                    <ProjectCard key={p.id} project={p} index={idx} />
                ))}
            </div>

            {/* See all link */}
            <div className="mt-14 flex justify-center">
                <NavLink
                    to="/work"
                    className="group inline-flex items-center gap-2 text-h1 font-medium"
                >
                    <span>See all</span>
                    <span
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                    >
                        →
                    </span>
                </NavLink>
            </div>
        </Section>
    )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const prefersReducedMotion = useReducedMotion()
    const cardRef = React.useRef<HTMLDivElement | null>(null)


    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    })

    const shift = prefersReducedMotion ? 0 : 90
    const y = useTransform(scrollYProgress, [0, 1], [-shift, shift])

    const safeScale = prefersReducedMotion ? 1 : 1.55

    const shrinkScale = 0.96
    const blurPx = 18

    return (
        <div
            ref={cardRef}
            className="overflow-hidden rounded-2xl bg-[#111111] text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
            {/* Image frame */}
            <div className="relative overflow-hidden rounded-2xl p-2">
                <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[16/10] w-full">
                        <motion.div
                            style={{ y, scale: safeScale }}
                            className="absolute inset-0 will-change-transform"
                        >
                            {/* Hover interaction layer (scale + blur + popup) */}
                            <motion.div
                                className="absolute inset-0"
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                            >
                                {/* Image: shrink then blur */}
                                <motion.img
                                    src={project.imageSrc}
                                    alt={project.imageAlt}
                                    className="h-full w-full object-cover"
                                    loading={index === 0 ? "eager" : "lazy"}
                                    draggable={false}
                                    variants={{
                                        rest: { scale: 1, filter: "blur(0px)" },
                                        hover: { scale: shrinkScale, filter: `blur(${blurPx}px)` },
                                    }}
                                    transition={{
                                        // 1) shrink first
                                        scale: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                                        // 2) blur after
                                        filter: {
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: 0.12,
                                        },
                                    }}
                                />

                                {/* 3) Popup container (appears after blur begins) */}
                                <motion.div
                                    className="absolute inset-0 grid place-items-center"
                                    initial={false}
                                    variants={{
                                        rest: {
                                            opacity: 0,
                                            y: 14,
                                            scaleX: 0.92,
                                            scaleY: 0.18, 
                                            transition: {
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        },
                                        hover: {
                                            opacity: 1,
                                            y: 0,
                                            scaleX: 1,
                                            scaleY: 1, 
                                            transition: {

                                                type: "spring",
                                                stiffness: 400,
                                                damping: 22,
                                                mass: 0.9,
                                                delay: 0.22, 
                                            },
                                        },
                                    }}
                                    style={{ transformOrigin: "center" }}
                                >
                                    {/* Video container placeholder */}
                                    <div className="mt-4 aspect-video w-[100%] max-w-[250px] overflow-hidden rounded-[9px] bg-white/30" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom meta */}
            <div className="px-5 pb-5 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-nav font-semibold tracking-wide">
                        {project.title}
                    </div>

                    <div className="flex items-center gap-6 text-nav-p text-white/70">
                        <span className="text-h1 uppercase tracking-wide">{project.category}</span>
                        <span className="text-h1 tabular-nums">{project.year}</span>
                    </div>
                </div>

                {/* Tech marquee */}
                <MarqueeText
                    text={project.techMarquee}
                    className="mt-3 text-nav-p"
                    durationMs={20000}
                />
            </div>
        </div>
    )
}

