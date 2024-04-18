import TagGroup, { TagItem } from "./tag-group"
import { ReactNode } from "react"

export interface TabItem extends TagItem {
    panel: ReactNode
}

interface Props {
    items: TabItem[],
    activeKey?: string,
    onClose?: (key: string) => void,
    onClick?: (key: string) => void
}

export default function Tabs({ items, activeKey }: Props) {
    const tabPanels: ReactNode[] = [];

    for (const item of items) {
        const isActive = item.key === activeKey;
        const tabPanel = <div className="h-full overflow-auto" style={{ display: isActive ? 'block' : 'none' }}>{item.panel}</div>
        tabPanels.push(tabPanel)
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0">
                <TagGroup items={items} activeKey={activeKey} />
            </div>
            <div className="bg-white rounded-md h-full mt-2 overflow-auto flex-1">
                {tabPanels}
            </div>
        </div>
    )
}