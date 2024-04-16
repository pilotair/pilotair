import { Tabs as AntdTabs, TabsProps } from "antd"
import { ReactNode, createContext, useContext, useState } from "react"
import { WorkspaceContext } from "./workspace"
import { Tab } from "./features"


type TabItems = NonNullable<TabsProps["items"]>

interface TabsContextValue {
    tabs: TabItems,
    closeTab: (key: string) => void
    openTab: (key: string) => void
}

export const TabsContext = createContext<TabsContextValue>({} as TabsContextValue)

interface Props {
    children: ReactNode
}

export function TabsContextProvider({ children }: Props) {

    const [tabs, setTabs] = useState<TabItems>([])
    const { setActive } = useContext(WorkspaceContext)

    function closeTab(key: string) {
        const tab = tabs.find(f => f.key == key);
        if (!tab) return;
        setTabs(tabs.filter(f => f != tab))
    }

    function openTab(key: string) {
        let tab = tabs.find(f => f.key == key);

        if (!tab) {
            tab = {
                key: key,
                label: "aa",
                children: <Tab name={key} />
            }
            setTabs([...tabs, tab])
        }

        setActive(key);
    }


    return <TabsContext.Provider value={{ tabs, closeTab, openTab }}>{children}</TabsContext.Provider>
}


export function Tabs() {
    const { tabs, closeTab } = useContext(TabsContext)
    const { active, setActive } = useContext(WorkspaceContext)

    function tabClick(key: string) {
        setActive(key)
    }

    const onTabEdit = (
        targetKey: string | React.MouseEvent | React.KeyboardEvent,
        action: 'add' | 'remove',
    ) => {
        if (action !== 'remove') return;
        if (typeof targetKey == "string") closeTab(targetKey);
    };


    return <AntdTabs
        className="bg-white h-full rounded-md"
        type="editable-card" items={tabs}
        hideAdd
        onEdit={onTabEdit}
        activeKey={active}
        onTabClick={tabClick}
        tabBarStyle={{ backgroundColor: "#f5f5f5" }}
    />
}