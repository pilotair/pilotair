import { create } from "zustand"
import { TabItem } from "../common/tab/tabs"
import { getFeature } from "./features"
import { ReactNode } from "react"
import { httpClient } from "../utils/request"
import { combine } from "../utils/path"

type MenuItem = {
    key: string,
    icon?: ReactNode,
    label: ReactNode,
    feature?: ReturnType<typeof getFeature>,
    children?: MenuItem[],
    className?: string
}

type ApiMenuItem = { order: number, name: string, type: string, children?: ApiMenuItem[] }

interface Store {
    activeName: string,
    tabs: TabItem[],
    menus: MenuItem[],
    setActiveName: (name: string) => void,
    closeTab: (name: string) => void,
    openTab: (name: string, label: ReactNode, panel: ReactNode, icon?: ReactNode) => void,
    loadMenus: () => void
}

export const useWorkspaceStore = create<Store>((set, get) => ({
    activeName: "",
    tabs: [],
    menus: [],
    setActiveName(name: string) {
        set({ activeName: name })
    },
    closeTab(name: string) {
        const { tabs, activeName } = get();
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
            set({ activeName })
        }

        set({ tabs: tabs.filter(f => f != tab) })
    },
    openTab(name: string, label: ReactNode, panel: ReactNode, icon?: ReactNode) {
        const { tabs } = get();
        let tab = tabs.find(f => f.name == name);

        if (tab) {
            set({ activeName: tab.name });
            return;
        }

        tab = {
            name: name,
            label,
            icon,
            panel
        }

        set({ tabs: [...tabs, tab], activeName: tab.name })
    },
    async loadMenus() {
        const menus = await httpClient.get<ApiMenuItem[]>("/__api__/menu");
        if (!menus) return;
        set({
            menus: mapMenuItem(menus, '')
        })
    }
}));

function mapMenuItem(items: ApiMenuItem[], currentPath: string) {
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