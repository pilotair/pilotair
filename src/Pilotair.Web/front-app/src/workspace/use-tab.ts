import { atom, useAtom } from "jotai";
import { TabItem } from "../common/tab/tabs";
import { ReactNode } from "react";

const activeNameAtom = atom("")
const tabsAtom = atom<TabItem[]>([])

export function useTab() {
    const [activeName, setActiveName] = useAtom(activeNameAtom);
    const [tabs, setTabs] = useAtom(tabsAtom);

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
    }
}