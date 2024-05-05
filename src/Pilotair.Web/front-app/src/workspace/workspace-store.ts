import { TabItem } from "../common/tab/tabs"
import { getFeature } from "./features"
import { ReactNode, useMemo } from "react"
import { fetcher } from "../utils/request"
import { combine } from "../utils/path"
import { atom, useAtom } from "jotai"
import useSWR from "swr"
import { Pilotair } from "../schema"

type MenuItem = {
    key: string,
    icon?: ReactNode,
    label: ReactNode,
    feature?: ReturnType<typeof getFeature>,
    children?: MenuItem[],
    className?: string
}


const activeNameAtom = atom("")
const tabsAtom = atom<TabItem[]>([])

export function useWorkspace() {
    const [activeName, setActiveName] = useAtom(activeNameAtom);
    const [tabs, setTabs] = useAtom(tabsAtom);

    const menusResponse = useSWR("/__api__/menu", fetcher);

    const menus = useMemo(() => {
        if (!menusResponse.data) return [];
        return mapMenuItem(menusResponse.data, '') ?? []
    }, [menusResponse.data])


    function closeTab(name: string) {
        const tab = tabs.find(f => f.name == name);
        if (!tab) return;

        if (name == activeName) {
            const currentTabIndex = tabs.indexOf(tab);
            let activeName = ''
            if (tabs[currentTabIndex - 1]) {
                activeName = tabs[currentTabIndex - 1]?.name
            } else if (tabs[currentTabIndex + 1]) {
                activeName = tabs[currentTabIndex + 1]?.name
            }
            setActiveName(activeName)
        }

        setTabs(tabs.filter(f => f != tab))
    }

    function openTab(name: string, label: ReactNode, panel: ReactNode, icon?: ReactNode) {
        let tab = tabs.find(f => f.name == name);

        if (tab) {
            setActiveName(tab.name);
            return;
        }

        tab = {
            name: name,
            label,
            icon,
            panel
        }

        setActiveName(tab.name);
        setTabs([...tabs, tab]);
    }

    return {
        activeName,
        tabs,
        setActiveName,
        closeTab,
        openTab,
        menus,
        loading: menusResponse.isLoading
    }
}

function mapMenuItem(items: Pilotair.Web.MenuItem[], currentPath: string) {
    const result: MenuItem[] = [];

    for (const item of items) {
        const feature = getFeature(item.type);
        let label: ReactNode = item.name;
        if (feature) {
            if (feature.label) {
                if (typeof feature.label === "function") {
                    label = feature.label(item.name)
                } else {
                    label = feature.label
                }
            }
        }

        const key = combine(currentPath, item.name);

        const i: MenuItem = {
            key: key,
            label,
            icon: feature?.icon,
            feature,
        }

        result.push(i)
        if (item.children) {
            i.children = mapMenuItem(item.children, key)
        }
    }

    return result.length ? result : undefined;
}