import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

type LoadingScreenProps = {
  progress: number
  phase: "loading" | "white"
}

export function LoadingScreen({ progress, phase }: LoadingScreenProps) {
  const [showNumber, setShowNumber] = useState(() => phase === "loading")

  const shouldRenderNumber = phase === "loading" || showNumber

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <AnimatePresence>
        {shouldRenderNumber && (
          <motion.div
            key="loader-number"
            className="relative overflow-hidden h-[1em] leading-[1] text-[14px] font-medium tabular-nums text-black"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={false}
              animate={
                phase === "loading"
                  ? { y: "0%", transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
                  : { y: "-110%", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
              }
              onAnimationComplete={() => {
                if (phase !== "loading") setShowNumber(false)
              }}
            >
              {progress}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
