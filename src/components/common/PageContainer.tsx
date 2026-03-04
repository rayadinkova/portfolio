import type { ReactNode } from "react"

type PageContainerProps = {
    children: ReactNode
    className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
    return (
        <div className={`mx-auto w-full px-6 md:px-8 ${className}`}>
            {children}
        </div>
    )
}
