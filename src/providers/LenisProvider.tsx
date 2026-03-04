import { ReactLenis } from "lenis/react"

type LenisProviderProps = {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
