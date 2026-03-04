import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTopOnRouteChange() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        // If we have a hash (#intro), let the hash-scroller handle it
        if (hash) return

        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }, [pathname, hash])

    return null
}
