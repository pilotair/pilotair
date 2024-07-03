import { Divider } from "antd"
import { ReactNode } from "react"

interface Props {
    header?: ReactNode
    children: ReactNode,
    footer?: ReactNode
}

export default function ToolbarLayout({ header, children, footer }: Props) {
    return (
        <div className="p-4 space-y-3 flex flex-col h-full">
            {(header) && <>
                <div className="flex-shrink-0 flex items-center">
                    {header}
                </div>
                <Divider className="flex-shrink-0" />
            </>}

            <div className="flex-1 overflow-auto">
                {children}
            </div>
            {footer && <div className="flex-shrink-0 flex items-center">
                {footer}
            </div>}
        </div>
    )
}