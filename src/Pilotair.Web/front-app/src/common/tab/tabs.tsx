import TabBar, { TabBarItem } from "./tab-bar";
import { ReactNode } from "react";
import TabPanel from "./panel";
import { compareTabKey } from "./utils";

export interface TabKey {
  name: string;
  type?: string;
}

export type TabItem = TabBarItem &
  TabKey & {
    panel: ReactNode;
  };

interface Props {
  items: TabItem[];
  activeKey?: TabKey;
  onTabClose?: (key: TabKey) => void;
  onTabClick?: (key: TabKey) => void;
}

export default function Tabs({
  items,
  activeKey,
  onTabClick,
  onTabClose,
}: Props) {
  const tabPanels: ReactNode[] = [];

  for (const item of items) {
    const tabPanel = (
      <TabPanel
        isActive={compareTabKey(item, activeKey)}
        tabKey={item}
        key={item.type + item.name}
      >
        {item.panel}
      </TabPanel>
    );

    tabPanels.push(tabPanel);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0">
        <TabBar
          items={items}
          activeKey={activeKey}
          onTagClick={onTabClick}
          onTagClose={onTabClose}
        />
      </div>
      <div className=" h-full mt-2 overflow-auto flex-1">{tabPanels}</div>
    </div>
  );
}
