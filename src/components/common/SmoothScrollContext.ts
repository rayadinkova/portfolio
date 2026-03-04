import * as React from "react"
import type Lenis from "lenis"

export type SmoothScrollContextValue = {
    lenis: Lenis | null
}

export const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
    lenis: null,
})
