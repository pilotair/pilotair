import { Tabs as AntdTabs, TabsProps, Empty, Tag } from "antd"
import { ReactNode, createContext, useContext, useState } from "react"
import { WorkspaceContext } from "./workspace"
import Feature from "./Feature"
import { getFeature } from "./features"
import { CloseOutlined } from "@ant-design/icons"


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
            const feature = getFeature(key)
            tab = {
                key: key,
                label: feature?.label,
                icon: feature?.icon,
                children: <div className="bg-white rounded-md h-full mt-2">
                    <Feature name={key} />
                </div>
            }
            setTabs([...tabs, tab])
        }

        setActive(key);
    }


    return <TabsContext.Provider value={{ tabs, closeTab, openTab }}>{children}</TabsContext.Provider>
}


type RenderTabBarProps = Parameters<NonNullable<TabsProps["renderTabBar"]>>[0]

export function Tabs() {
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

    function CustomTabBar(props: RenderTabBarProps) {
        return <div>
            {tabs.map(tab => {
                const active = props.activeKey == tab.key;
                return <Tag
                    key={tab.key}
                    closeIcon={<CloseOutlined style={{ color: active ? '#fff' : '#000' }} />}
                    onClose={(e) => onClose(tab.key, e)}
                    bordered={false}
                    icon={tab.icon}
                    className="cursor-pointer"
                    color={active ? 'blue-inverse' : "default"}
                    onClick={(e) => props.onTabClick(tab.key, e)}>
                    {tab.label}
                </Tag>
            })}
        </div>
    }

    return <>
        <AntdTabs
            className="h-full"
            items={tabs}
            activeKey={active}
            onTabClick={tabClick}
            renderTabBar={CustomTabBar}
        />
    </>
}


