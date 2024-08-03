import { atom, useAtom } from "jotai";
import { TabItem, TabKey } from "../common/tab/tabs";
import { useContext } from "react";
import { TabContext } from "@/common/tab/context";
import { compareTabKey } from "@/common/tab/utils";

const activeKeyAtom = atom<TabKey | undefined>(undefined);
const tabsAtom = atom<TabItem[]>([]);

export function useTab() {
  const [activeKey, setActiveKey] = useAtom<TabKey | undefined>(activeKeyAtom);
  const [tabs, setTabs] = useAtom(tabsAtom);
  const { tabKey: currentTabKey } = useContext(TabContext);

  function closeTab(key?: TabKey) {
    key = currentTabKey || key;
    const tab = tabs.find((f) => f.name == key.name && f.type == key.type);
    if (!tab) return;

    if (compareTabKey(key, activeKey)) {
      const currentTabIndex = tabs.indexOf(tab);
      let activeTab: TabItem | undefined = undefined;
      if (tabs[currentTabIndex - 1]) {
        activeTab = tabs[currentTabIndex - 1];
      } else if (tabs[currentTabIndex + 1]) {
        activeTab = tabs[currentTabIndex + 1];
      }

      if (activeTab) {
        setActiveTab(activeTab);
      }
    }

    setTabs(tabs.filter((f) => f != tab));
  }

  function openTab(value: TabItem) {
    const tab = tabs.find((f) => f.name == value.name && f.type == value.type);

    if (tab) {
      setActiveTab(tab);
      return;
    }

    setActiveTab(value);
    setTabs([...tabs, value]);
  }

  function setActiveTab({ name, type }: TabKey) {
    setActiveKey({ name, type });
  }

  return {
    tabs,
    activeKey,
    setActiveTab,
    closeTab,
    openTab,
  };
}
