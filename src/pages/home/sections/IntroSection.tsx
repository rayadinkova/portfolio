import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Section } from "../../../components/common/Section"

type RevealClipProps = {
  children: React.ReactNode
  className?: string
  delaySec?: number
}

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


export function IntroSection() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = React.useRef<HTMLDivElement | null>(null)

  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)

  const x = useSpring(xRaw, { stiffness: 140, damping: 28, mass: 0.35 })
  const y = useSpring(yRaw, { stiffness: 260, damping: 28, mass: 0.2 })

  const frameRef = React.useRef<HTMLDivElement | null>(null)

  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n))
  }

  React.useEffect(() => {
    if (prefersReducedMotion) return

    function onWindowPointerMove(e: PointerEvent) {
      if (e.pointerType && e.pointerType !== "mouse") return

      const frame = frameRef.current
      if (!frame) return

      const vw = window.innerWidth || 1
      const rect = frame.getBoundingClientRect()

      const targetLeft = e.clientX - rect.width / 2
      const clampedLeft = clamp(targetLeft, 0, vw - rect.width)

      const nextX = clampedLeft - rect.left
      xRaw.set(nextX)
      yRaw.set(0)
    }

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onWindowPointerMove)
  }, [prefersReducedMotion, xRaw, yRaw])

  React.useEffect(() => {
    function onWindowLeave() {
      xRaw.set(0)
      yRaw.set(0)
    }
    window.addEventListener("mouseleave", onWindowLeave)
    return () => window.removeEventListener("mouseleave", onWindowLeave)
  }, [xRaw, yRaw])





  return (
    <Section id="intro" className="mt-20 py-6 md:py-6">

      <div ref={heroRef} className="relative">
        {/* Image / Video block */}
        <div className="order-2 md:order-1 md:justify-self-end mt-2 md:mt-0">
          <div ref={frameRef} className="relative h-52 w-full md:h-56 md:w-130">
            {/* MOBILE: static */}
            <div className="absolute inset-0 rounded-2xl bg-black/10 md:hidden" />

            <motion.div
              className="hidden md:block absolute inset-0 rounded-2xl bg-black/10 will-change-transform"
              style={{
                x: prefersReducedMotion ? 0 : x,
                y: prefersReducedMotion ? 0 : y,
              }}
            />
          </div>
        </div>
      </div>


      {/* Kicker row (Phase 2) */}
      <div className="order-1 md:order-2 md:col-span-2 mt-8 md:mt-5">
        <div className="flex items-center justify-between">
          <span className="text-hero-d">
            <RevealClip delaySec={0.45}>A</RevealClip>
          </span>
          <span className="text-hero-d">
            <RevealClip delaySec={0.53}>SERIOUSLY</RevealClip>
          </span>
          <span className="text-hero-d">
            <RevealClip delaySec={0.61}>GOOD</RevealClip>
          </span>
        </div>
      </div>

      {/* Big title (Phase 2) */}
      <div className="order-3 md:order-3 md:col-span-2 w-full mt-10 md:mt-0">
        <h1
          className={[
            "mt-4 md:mt-0",
            "w-full uppercase font-bold",
            "flex flex-col items-center text-center",
            "md:flex-row md:justify-between md:items-end md:text-left",
            "md:gap-8",
          ].join(" ")}
        >
          <span className="leading-[0.9] md:text-[144px] text-[64px] md:-ml-[0.08em]">
            <RevealClip delaySec={0.45}>DESIGN</RevealClip>
          </span>
          <span className="leading-[0.9] md:text-[144px] text-[64px]">
            <RevealClip delaySec={0.55}>ENGINEER</RevealClip>
          </span>
        </h1>
      </div>

      {/* Bottom row (Phase 1) */}
      <div className="order-6 md:col-span-2 mt-6 md:mt-20">
        <div className="flex items-center justify-between gap-1">
          <div className="inline-flex items-center gap-1">
            <RevealClip delaySec={0.10}>
              <ArrowDown className="h-4 w-4" />
            </RevealClip>
            <span className="text-h1">
              <RevealClip delaySec={0.16}>Scroll for</RevealClip>
            </span>
          </div>

          <div className="inline-flex items-center gap-1">
            <span className="text-h1">
              <RevealClip delaySec={0.22}>cool sh*t</RevealClip>
            </span>
            <RevealClip delaySec={0.28}>
              <ArrowDown className="h-4 w-4" />
            </RevealClip>
          </div>
        </div>
      </div>
    </Section>
  )
}

