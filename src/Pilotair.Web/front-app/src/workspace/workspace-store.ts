import { TabItem } from "../common/tab/tabs"
import { getFeature } from "./features"
import { ReactNode, useEffect } from "react"
import { httpClient } from "../utils/request"
import { combine } from "../utils/path"
import { atom, useAtom } from "jotai"
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
const menusAtom = atom<MenuItem[]>([])

export function useWorkspace() {
    const [activeName, setActiveName] = useAtom(activeNameAtom);
    const [tabs, setTabs] = useAtom(tabsAtom);
    const [menus, setMenus] = useAtom(menusAtom)

    async function loadMenus() {
        const response = await httpClient.get<Pilotair.Web.MenuItem[]>("/__api__/menu");
        setMenus(mapMenuItem(response ?? [], '') ?? []);

    }

    useEffect(() => {
        loadMenus();
    }, [])

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
        loadMenus
    }
}

function mapMenuItem(items: Pilotair.Web.MenuItem[], currentPath: string) {
    const result: MenuItem[] = [];

    for (const item of items) {
        const feature = getFeature(item.type);
        let label: ReactNode = item.name;
        if (feature?.label) {
            if (typeof feature.label === "function") {
                label = feature.label(item.name)
            } else {
                label = feature.label
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