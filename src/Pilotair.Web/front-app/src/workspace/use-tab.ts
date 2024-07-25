import { atom, useAtom } from "jotai";
import { TabItem } from "../common/tab/tabs";
import { useContext } from "react";
import { TabContext } from "@/common/tab/context";

const activeNameAtom = atom("");
const tabsAtom = atom<TabItem[]>([]);

export function useTab() {
  const [activeName, setActiveName] = useAtom(activeNameAtom);
  const [tabs, setTabs] = useAtom(tabsAtom);
  const { name: currentTabName } = useContext(TabContext);

  function closeTab(name?: string) {
    name = name || currentTabName;
    const tab = tabs.find((f) => f.name == name);
    if (!tab) return;

    if (name == activeName) {
      const currentTabIndex = tabs.indexOf(tab);
      let activeName = "";
      if (tabs[currentTabIndex - 1]) {
        activeName = tabs[currentTabIndex - 1]?.name;
      } else if (tabs[currentTabIndex + 1]) {
        activeName = tabs[currentTabIndex + 1]?.name;
      }
      setActiveName(activeName);
    }

    setTabs(tabs.filter((f) => f != tab));
  }

  function openTab(value: TabItem) {
    const tab = tabs.find((f) => f.name == value.name);

    if (tab) {
      setActiveName(tab.name);
      return;
    }

    setActiveName(value.name);
    setTabs([...tabs, value]);
  }

  function replaceTab(oldPath: string, value: TabItem) {
    const index = tabs.findIndex((f) => f.name == oldPath);

    if (index == -1) {
      tabs.push(value);
    } else {
      tabs.splice(index, 1, value);
    }

    setTabs([...tabs]);
    if (activeName == oldPath) setActiveName(value.name);
  }

  return {
    activeName,
    tabs,
    setActiveName,
    closeTab,
    openTab,
    replaceTab,
  };
}
