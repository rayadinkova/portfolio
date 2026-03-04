import * as React from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useReducedMotion } from "framer-motion"
import { SmoothScrollContext } from "../common/SmoothScrollContext"


export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion()
    const [lenis, setLenis] = React.useState<Lenis | null>(null)
    const lenisRef = React.useRef<Lenis | null>(null)

    React.useEffect(() => {
        if (prefersReducedMotion) {
            if (lenisRef.current) {
                lenisRef.current.destroy()
                lenisRef.current = null
            }
            setLenis(null)
            return
        }

        const instance = new Lenis({
            duration: 1.35,
            smoothWheel: true,
            syncTouch: true,
            lerp: 0.08,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
        })

        lenisRef.current = instance
        setLenis(instance)

        let rafId = 0
        const raf = (time: number) => {
            instance.raf(time)
            rafId = window.requestAnimationFrame(raf)
        }
        rafId = window.requestAnimationFrame(raf)

        return () => {
            window.cancelAnimationFrame(rafId)
            instance.destroy()
            lenisRef.current = null
            setLenis(null)
        }
    }, [prefersReducedMotion])

    const value = React.useMemo(() => ({ lenis }), [lenis])

    return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
