import TagGroup, { TagItem } from "../tag-group"
import { ReactNode } from "react"
import TabPanel from "./tab-panel"

export interface TabItem extends TagItem {
    panel: ReactNode
}

interface Props {
    items: TabItem[],
    activeName?: string,
    onTabClose?: (name: string) => void,
    onTabClick?: (name: string) => void
}

export default function Tabs({ items, activeName, onTabClick, onTabClose }: Props) {
    const tabPanels: ReactNode[] = [];

    for (const item of items) {
        const tabPanel = (
            <TabPanel isActive={item.name === activeName} name={item.name} key={item.name}>
                {item.panel}
            </TabPanel>
        )

        tabPanels.push(tabPanel)
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0">
                <TagGroup items={items} activeName={activeName} onTagClick={onTabClick} onTagClose={onTabClose} />
            </div>
            <div className=" h-full mt-2 overflow-auto flex-1">
                {tabPanels}
            </div>
        </div>
    )
}