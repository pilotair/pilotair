import TagGroup, { TagItem } from "../tag-group"
import { ReactNode, createContext } from "react"

export interface TabItem extends TagItem {
    panel: ReactNode
}

interface Props {
    items: TabItem[],
    activeKey?: string,
    onTabClose?: (key: string) => void,
    onTabClick?: (key: string) => void
}

export const TabContext = createContext<{ key: string }>({ key: "" })

export default function Tabs({ items, activeKey, onTabClick, onTabClose }: Props) {
    const tabPanels: ReactNode[] = [];


    for (const item of items) {

        const isActive = item.key === activeKey;
        const tabPanel = (
            <TabContext.Provider value={{ key: item.key }} key={item.key}>
                <div
                    key={item.key}
                    className={"bg-white rounded-md h-full overflow-auto relative" + ` tab-panel-${item.key}`}
                    style={{ display: isActive ? 'block' : 'none' }}
                >{item.panel}</div>
            </TabContext.Provider>
        )


        tabPanels.push(tabPanel)
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0">
                <TagGroup items={items} activeKey={activeKey} onTagClick={onTabClick} onTagClose={onTabClose} />
            </div>
            <div className=" h-full mt-2 overflow-auto flex-1">
                {tabPanels}
            </div>
        </div>
    )
}