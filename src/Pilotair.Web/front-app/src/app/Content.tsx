import { TabsProps, Empty, Tag } from "antd"
import { ReactNode, createContext, useContext, useState } from "react"
import { WorkspaceContext } from "./workspace"
import Feature from "./Feature"
import { getFeature } from "./features"
import Tabs, { TabItem } from "../common/Tabs"

interface TabsContextValue {
    tabs: TabItem[],
    closeTab: (key: string) => void
    openTab: (key: string) => void
}

export const TabsContext = createContext<TabsContextValue>({} as TabsContextValue)

interface Props {
    children: ReactNode
}

export function TabsContextProvider({ children }: Props) {

    const [tabs, setTabs] = useState<TabItem[]>([])
    const { setActive } = useContext(WorkspaceContext)

    function closeTab(key: string) {
        const tab = tabs.find(f => f.key == key);
        if (!tab) return;
        setTabs(tabs.filter(f => f != tab))
    }

    function openTab(key: string) {
        let tab = tabs.find(f => f.key == key);

        if (!tab) {
            const feature = getFeature(key)
            tab = {
                key: key,
                label: feature?.label,
                icon: feature?.icon,
                panel: <Feature name={key} />
            }
            setTabs([...tabs, tab])
        }

        setActive(key);
    }


    return <TabsContext.Provider value={{ tabs, closeTab, openTab }}>{children}</TabsContext.Provider>
}

export function Content() {
    const { tabs, closeTab } = useContext(TabsContext)
    const { active, setActive } = useContext(WorkspaceContext)

    function tabClick(key: string) {
        setActive(key)
    }

    function onClose(key: string, e: React.MouseEvent) {
        e.preventDefault();
        if (key == active) {
            let currentTabIndex = tabs.findIndex(f => f.key == key);
            if (currentTabIndex == -1) return;
            if (currentTabIndex == 0) {
                if (tabs.length > 1) currentTabIndex = 1
            } else {
                currentTabIndex--;
            }
            setActive(tabs[currentTabIndex].key)
        }
        closeTab(key);
    }

    if (!tabs.length) {
        return <Empty className="h-full flex items-center justify-center" description={false} />
    }

    return <>
        <Tabs items={tabs} activeKey={active} />
    </>
}


