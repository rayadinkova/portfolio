import * as React from "react"
import { ArrowRight } from "lucide-react"

type CommonProps = {
    children: React.ReactNode
    className?: string
}

type AnchorVariantProps = CommonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string
    }

type ButtonVariantProps = CommonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined
    }

type InteractiveHoverButtonProps = AnchorVariantProps | ButtonVariantProps

export const InteractiveHoverButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ children, className = "", ...props }, ref) => {
    const baseClassName = [
        "group relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full",
        "border border-black bg-transparent text-black",
        "hover:bg-black hover:text-white",
        "py-3 pr-6 pl-8",
        "shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        "motion-reduce:transition-none",
        className,
    ].join(" ")

    const content = (
        <>
            <span
                aria-hidden="true"
                className={[
                    "absolute left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full",
                    "bg-black",
                    "transition-transform duration-300 ease-out",
                    "group-hover:scale-[80]",
                    "motion-reduce:transition-none motion-reduce:transform-none",
                ].join(" ")}
            />

            {/* Default content (slides away) */}
            <span
                className={[
                    "relative z-10 inline-flex items-center gap-2",
                    "transition-all duration-300 ease-out",
                    "group-hover:translate-x-10 group-hover:opacity-0",
                    "motion-reduce:transition-none motion-reduce:transform-none",
                ].join(" ")}
            >
                {children}
            </span>

            {/* Hover content (slides in) */}
            <span
                className={[
                    "absolute inset-0 z-10 inline-flex items-center justify-center gap-2",
                    "translate-x-10 opacity-0",
                    "text-white",
                    "transition-all duration-300 ease-out",
                    "group-hover:translate-x-0 group-hover:opacity-100",
                    "motion-reduce:transition-none motion-reduce:transform-none",
                ].join(" ")}
            >
                <span>{children}</span>
                <ArrowRight className="h-4 w-4" />
            </span>
        </>
    )

    // Anchor variant (mailto)
    if ("href" in props && typeof props.href === "string") {
        const { href, ...anchorProps } = props
        return (
            <a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                className={baseClassName}
                {...anchorProps}
            >
                {content}
            </a>
        )
    }

    // Button variant
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            className={baseClassName}
            {...buttonProps}
        >
            {content}
        </button>
    )
})

InteractiveHoverButton.displayName = "InteractiveHoverButton"

