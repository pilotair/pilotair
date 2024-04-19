import { create } from "zustand"
import { TabItem } from "../common/tab/tabs"
import { features, getFeature } from "./features"
import Feature from "./feature"
import { ReactNode } from "react"
import { httpClient } from "../utils/request"

type MenuItem = { key: string, icon?: ReactNode, label: string }

interface Store {
    activeName: string,
    tabs: TabItem[],
    menus: MenuItem[],
    setActiveName: (name: string) => void,
    closeTab: (name: string) => void,
    openTab: (name: string) => void,
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
            if (tabs[currentTabIndex - 1]) {
                set({ activeName: tabs[currentTabIndex - 1].name })
            } else if (tabs[currentTabIndex + 1]) {
                set({ activeName: tabs[currentTabIndex + 1].name })
            }
        }

        set({ tabs: tabs.filter(f => f != tab) })
    },
    openTab(name: string) {
        const { tabs } = get();
        let tab = tabs.find(f => f.name == name);

        if (tab) {
            set({ activeName: tab.name });
            return;
        }

        const feature = getFeature(name)
        if (!feature) return;

        tab = {
            name: name,
            label: feature?.label,
            icon: feature?.icon,
            panel: Feature({ name: feature.name })
        }

        set({ tabs: [...tabs, tab], activeName: tab.name })
    },
    async loadMenus() {
        const menus = await httpClient.get<{ name: string, label: string, icon: string }[]>("/__api__/menu");
        if (!menus) return;
        set({
            menus: menus.map(m => ({
                key: m.name,
                label: m.label,
                icon: features.find(f => f.name == m.name)?.icon
            }))
        })
    }
}));