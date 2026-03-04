import { useCallback, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { LoadingTransition } from "../../components/common/LoadingTransition"

export function BootGate() {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (isDone) return

    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1
        if (next >= 100) {
          window.clearInterval(intervalId)
          return 100
        }
        return next
      })
    }, 20)

    return () => window.clearInterval(intervalId)
  }, [isDone])

  const handleDone = useCallback(() => {
    setIsDone(true)
  }, [])

  if (!isDone) {
    return <LoadingTransition count={progress} holdMs={250} onDone={handleDone} />
  }

  return (
    <motion.div
      key="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <Outlet />
    </motion.div>
  )
}
