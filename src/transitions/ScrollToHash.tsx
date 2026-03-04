import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useReducedMotion } from "framer-motion"
import { useLenis } from "../components/common/useLenis"

export function ScrollToHash() {
    const { pathname, hash } = useLocation()
    const prefersReducedMotion = useReducedMotion()
    const lenis = useLenis()

    useEffect(() => {
        if (!hash) return

        const id = decodeURIComponent(hash.replace("#", "")).trim()
        if (!id) return

        const run = () => {
            const el = document.getElementById(id)
            if (!el) return

            if (prefersReducedMotion || !lenis) {
                el.scrollIntoView({ behavior: "auto", block: "start" })
                return
            }

            lenis.scrollTo(el, {
                offset: 0,
                duration: 1.35, //slower/faster anchor jumps
                immediate: false,
                lock: false,
            })
        }

        const rafId = window.requestAnimationFrame(run)
        const timeoutId = window.setTimeout(run, 60)

        return () => {
            window.cancelAnimationFrame(rafId)
            window.clearTimeout(timeoutId)
        }
    }, [pathname, hash, prefersReducedMotion, lenis])

    return null
}

