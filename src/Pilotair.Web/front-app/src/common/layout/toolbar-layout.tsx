import { Divider } from "antd"
import { ReactNode } from "react"

interface Props {
    header?: ReactNode
    children: ReactNode,
    footer?: ReactNode
}

export default function ToolbarLayout({ header, children, footer }: Props) {
    const items: ReactNode[] = [];

    if (header) {
        items.push(<div key="header" className="px-4 flex-shrink-0 flex items-center">
            {header}
        </div>)
        items.push(<Divider key="divider" className="flex-shrink-0" />)
    }

    items.push(<div key="body" className="mx-2 px-2 flex-1 overflow-auto">
        {children}
    </div>)

    if (footer) {
        items.push(<div key="footer" className="flex-shrink-0 flex items-center">
            {footer}
        </div>)
    }

    return (
        <div className="py-4 space-y-3 flex flex-col h-full">
            {items}
        </div>
    )
}