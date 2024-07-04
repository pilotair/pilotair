import { atom, useAtom } from "jotai";
import { TabItem } from "../common/tab/tabs";

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

    function openTab(value: TabItem) {
        const tab = tabs.find(f => f.name == value.name);

        if (tab) {
            setActiveName(tab.name);
            return;
        }

        setActiveName(value.name);
        setTabs([...tabs, value]);
    }

    return {
        activeName,
        tabs,
        setActiveName,
        closeTab,
        openTab,
    }
}