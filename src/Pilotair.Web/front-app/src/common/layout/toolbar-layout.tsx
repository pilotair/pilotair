import { Divider } from "antd"
import { ReactNode } from "react"

interface Props {
    barLeft?: ReactNode,
    barRight?: ReactNode
    children: ReactNode,
    footer?: ReactNode
}

export default function ToolbarLayout({ barLeft, barRight, children, footer }: Props) {
    return (
        <div className="p-4 space-y-3 flex flex-col h-full">
            {(barRight || barRight) && <>
                <div className="flex-shrink-0 flex items-center">
                    {barLeft}
                    <div className="flex-1"></div>
                    {barRight}
                </div>
                <Divider className="flex-shrink-0" />
            </>}

            <div className="flex-1 overflow-auto">
                {children}
            </div>
            {footer && <div className="flex-shrink-0">
                {footer}
            </div>}
        </div>
    )
}