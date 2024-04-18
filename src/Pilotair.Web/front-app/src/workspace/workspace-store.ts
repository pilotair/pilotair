import { create } from "zustand"
import { TabItem } from "../common/tab/tabs"
import { getFeature } from "./features"
import Feature from "./feature"
import { ReactNode } from "react"
import { httpClient } from "../utils/request"

type MenuItem = { key: string, icon?: ReactNode, label: string }

interface Store {
    activeKey: string,
    tabs: TabItem[],
    menus: MenuItem[],
    setActiveKey: (key: string) => void,
    closeTab: (key: string) => void,
    openTab: (key: string) => void,
    loadMenus: () => void
}

export const useWorkspaceStore = create<Store>((set, get) => ({
    activeKey: "",
    tabs: [],
    menus: [],
    setActiveKey(key: string) {
        set({ activeKey: key })
    },
    closeTab(key: string) {
        const { tabs, activeKey } = get();
        const tab = tabs.find(f => f.key == key);
        if (!tab) return;

        if (key == activeKey) {
            const currentTabIndex = tabs.indexOf(tab);
            if (tabs[currentTabIndex - 1]) {
                set({ activeKey: tabs[currentTabIndex - 1].key })
            } else if (tabs[currentTabIndex + 1]) {
                set({ activeKey: tabs[currentTabIndex + 1].key })
            }
        }

        set({ tabs: tabs.filter(f => f != tab) })
    },
    openTab(key: string) {
        const { tabs } = get();
        let tab = tabs.find(f => f.key == key);

        if (tab) {
            set({ activeKey: tab.key });
            return;
        }

        const feature = getFeature(key)
        if (!feature) return;

        tab = {
            key: key,
            label: feature?.label,
            icon: feature?.icon,
            panel: Feature({ name: feature.name })
        }

        set({ tabs: [...tabs, tab], activeKey: tab.key })
    },
    async loadMenus() {
        const menus = await httpClient.get<{ key: string, label: string, icon: string }[]>("/__api__/menu");
        if (!menus) return;
        set({
            menus: menus.map(m => ({
                key: m.key,
                label: m.label,
            }))
        })
    }
}));