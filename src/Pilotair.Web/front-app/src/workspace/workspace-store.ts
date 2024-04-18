import { create } from "zustand"
import { TabItem } from "../common/tabs"
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

export const useWorkspaceStore = create<Store>(set => ({
    activeKey: "",
    tabs: [],
    menus: [],
    setActiveKey(key: string) {
        return { activeKey: key }
    },
    closeTab(key: string) {
        set((state) => {
            const tab = state.tabs.find(f => f.key == key);
            if (!tab) return {};
            let activeKey = state.activeKey;

            if (key == state.activeKey) {
                const currentTabIndex = state.tabs.indexOf(tab);
                if (state.tabs[currentTabIndex - 1]) {
                    activeKey = state.tabs[currentTabIndex - 1].key
                } else if (state.tabs[currentTabIndex + 1]) {
                    activeKey = state.tabs[currentTabIndex + 1].key
                }
            }

            return { tabs: state.tabs.filter(f => f != tab), activeKey }
        })
    },
    openTab(key: string) {
        set(state => {
            let tab = state.tabs.find(f => f.key == key);
            if (tab) {
                return { activeKey: tab.key }
            }
            const feature = getFeature(key)
            if (!feature) return {};

            tab = {
                key: key,
                label: feature?.label,
                icon: feature?.icon,
                panel: Feature({ name: feature.name })
            }

            return { tabs: [...state.tabs, tab], activeKey: tab.key }
        })
    },
    async loadMenus() {
        const menus = await httpClient.get<{ key: string, label: string, icon: string }[]>("/__api__/menu");
        set({
            menus: menus.map(m => ({
                key: m.key,
                label: m.label,
            }))
        })
    }
}));