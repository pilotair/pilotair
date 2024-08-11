import { TabItem, TabKey } from "@/common/tab/tabs";
import { compareTabKey } from "@/common/tab/utils";
import { ChildrenProps } from "@/common/types";
import { createContext, useState } from "react";

export const TabsContext = createContext(
  {} as {
    tabs: TabItem[];
    activeKey: TabKey | undefined;
    setActiveKey: (key: TabKey) => void;
    openTab: (value: TabItem) => void;
    closeTab: (key: TabKey | string) => void;
  },
);

export function TabsProvider({ children }: ChildrenProps) {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeKey, setActiveKey] = useState<TabKey | undefined>();

  function openTab(value: TabItem) {
    const tab = tabs.find((f) => compareTabKey(f, value));

    if (tab) {
      setActiveKey(tab);
    } else {
      setActiveKey(value);
      setTabs([...tabs, value]);
    }
  }

  function closeTab(key: TabKey | string) {
    setTabs((value) => {
      const closedTabs = [];
      let activeTab = activeKey;

      if (typeof key === "string") {
        const list = value.filter((f) => f.name.startsWith(key as string));
        for (const item of list) {
          closedTabs.push(item);
        }
      } else {
        const tab = value.find((f) => compareTabKey(f, key));
        if (tab) closedTabs.push(tab);
      }

      for (const i of closedTabs) {
        if (compareTabKey(i, activeTab)) {
          const currentTabIndex = value.indexOf(i);
          if (value[currentTabIndex - 1]) {
            activeTab = value[currentTabIndex - 1];
          } else if (value[currentTabIndex + 1]) {
            activeTab = value[currentTabIndex + 1];
          } else {
            activeTab = undefined;
          }
        }
        value = value.filter((f) => f != i);
      }

      setActiveKey(activeTab);
      return value;
    });
  }

  return (
    <TabsContext.Provider
      value={{ tabs, openTab, activeKey, setActiveKey, closeTab }}
    >
      {children}
    </TabsContext.Provider>
  );
}
