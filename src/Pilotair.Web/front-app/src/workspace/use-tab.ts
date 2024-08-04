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

  function closeTab(key?: TabKey | string) {
    if (typeof key === "string") {
      const list = tabs.filter((f) => f.name.startsWith(key as string));
      for (const item of list) {
        closeTab(item);
      }
      return;
    }

    key = key || currentTabKey;
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

      setActiveKey(activeTab);
    }

    setTabs(tabs.filter((f) => f != tab));
  }

  function openTab(value: TabItem) {
    const tab = tabs.find((f) => f.name == value.name && f.type == value.type);

    if (tab) {
      setActiveKey(tab);
    } else {
      setActiveKey(value);
      setTabs([...tabs, value]);
    }
  }

  return {
    tabs,
    activeKey,
    setActiveTab: setActiveKey,
    closeTab,
    openTab,
  };
}
