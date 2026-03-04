import * as React from "react"
import type Lenis from "lenis"
import { SmoothScrollContext } from "../common/SmoothScrollContext"

export function useLenis(): Lenis | null {
    return React.useContext(SmoothScrollContext).lenis
}
