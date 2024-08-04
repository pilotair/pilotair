import { ReactNode } from "react";
import { TabProvider } from "./context";
import { LoadingProvider } from "../loading-context";
import { TabKey } from "./tabs";

interface TabPanelProps {
  children: ReactNode;
  tabKey: TabKey;
  isActive: boolean;
}

export default function TabPanel({
  children,
  tabKey,
  isActive,
}: TabPanelProps) {
  return (
    <div
      className="bg-white rounded-md h-full overflow-auto"
      style={{ display: isActive ? "block" : "none" }}
    >
      <TabProvider tabKey={tabKey}>
        <LoadingProvider>
          <div className="h-full overflow-auto">{children}</div>
        </LoadingProvider>
      </TabProvider>
    </div>
  );
}
