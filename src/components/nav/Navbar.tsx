import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { MarqueeText } from "../common/MarqueeText"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // New: becomes true only AFTER the menu has finished opening
  const [menuOpened, setMenuOpened] = useState(false)

  const location = useLocation()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const navMenuRef = useRef<HTMLDivElement | null>(null)
  const isOpenRef = useRef(false)

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
    setMenuOpened(false)
  }

  function toggleMenu() {
    setIsOpen((prev) => {
      const next = !prev
      // Reset so reveal replays every time you open
      setMenuOpened(false)
      return next
    })
  }

  useEffect(() => {
    if (!isOpenRef.current) return
    queueMicrotask(() => closeMenu())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close on click outside
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!isOpenRef.current) return
      const root = rootRef.current
      if (!root) return
      if (root.contains(e.target as Node)) return
      closeMenu()
    }

    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Wait for the CSS open transition to finish, then allow item reveal
  useEffect(() => {
    if (!isOpen) return

    const el = navMenuRef.current
    if (!el) return

    let didFire = false

    function onTransitionEnd(e: TransitionEvent) {
      // Only respond to the container’s transition end, not children
      if (e.target !== el) return
      if (didFire) return
      didFire = true
      setMenuOpened(true)
    }

    el.addEventListener("transitionend", onTransitionEnd)

    // Fallback so it never gets stuck invisible if no transitionend fires
    const fallbackId = window.setTimeout(() => {
      if (!didFire) setMenuOpened(true)
    }, 250)

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd)
      window.clearTimeout(fallbackId)
    }
  }, [isOpen])

  return (
    <motion.div
      ref={rootRef}
      className="fixed left-1/2 z-50 w-[calc(100%-48px)] max-w-[660px] -translate-x-1/2 bottom-6 md:bottom-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <div className="overflow-hidden rounded-[20px] bg-[#111111] text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Expanded menu (opens upward) */}
        <div
          ref={navMenuRef}
          className={["nav-menu", isOpen ? "nav-menu--open" : ""].join(" ")}
        >
          <div className="nav-menu__inner">
            <nav className="p-4 md:p-5" aria-label="Primary">
              <ul className="space-y-3">
                <li>
                  <MenuItem to="/" label="Home" reveal={menuOpened} index={0} />
                </li>
                <li>
                  <MenuItem to="/work" label="Work" reveal={menuOpened} index={1} />
                </li>
              </ul>
            </nav>
          </div>

          {/* Divider */}
          <div className="px-5 md:px-6">
            <div
              key={isOpen ? "open" : "closed"}
              aria-hidden="true"
              className="h-px w-full bg-white/10 origin-left divider-reveal"
            />
          </div>
        </div>

        {/* Base bar */}
        <div className="flex items-center gap-4 p-4 md:p-5">
          <div
            className="h-14 w-14 shrink-0 rounded-[9px] bg-white/10"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <NavLink to="/#intro" className="text-nav tracking-wide md:text-h1">
              RAYA DINKOVA
            </NavLink>

            <MarqueeText
              text="CREATIVE DESIGN ENGINEER, REACT DEVELOPER, NEXT.JS ENTHUSIAST, CONTENT CREATOR,"
              className="text-nav-p md:text-sm"
              durationMs={20000}
            />
          </div>

          <button
            type="button"
            className={[
              "grid h-12 w-12 shrink-0 place-items-center rounded-[9px]",
              "text-white hover:text-white/60",
              "transition-colors",
              "focus:outline-none",
            ].join(" ")}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function MenuItem({
  to,
  label,
  reveal,
  index,
}: {
  to: string
  label: string
  reveal: boolean
  index: number
}) {
  const delaySec = reveal ? 0.06 * index : 0

  return (
    <NavLink
      to={to}
      className={() =>
        ["group flex items-center gap-4 rounded-[9px] p-3 transition"].join(" ")
      }
    >
      {/* Keep your thumbnail reveal as-is (optional). */}
      <motion.div
        className="h-12 w-12 rounded-[9px] bg-white/10"
        aria-hidden="true"
        initial={false}
        animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: 1.0,
          ease: [0.22, 1, 0.36, 1],
          delay: delaySec,
        }}
      />

      {/* Masked reveal + keep hover flip */}
      <div className="relative h-[28px] overflow-hidden">
        <motion.div
          className="will-change-transform"
          initial={false}
          animate={reveal ? { y: "0%" } : { y: "110%" }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
            delay: delaySec,
          }}
        >
          {/* Hover flip stays EXACTLY the same */}
          <span
            className={[
              "block",
              "transition-transform duration-300 ease-out",
              "group-hover:-translate-y-[28px]",
            ].join(" ")}
          >
            <span className="block text-nav leading-[28px]">{label}</span>
            <span className="block text-nav leading-[28px] text-white/60">
              {label}
            </span>
          </span>
        </motion.div>
      </div>
    </NavLink>
  )
}
