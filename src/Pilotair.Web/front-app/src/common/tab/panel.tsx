import { ReactNode } from "react";
import { TabProvider } from "./context";
import { LoadingProvider } from "../loading-context";

interface TabPanelProps {
  children: ReactNode;
  name: string;
  type?: string;
  isActive: boolean;
}

export default function TabPanel({
  children,
  name,
  type,
  isActive,
}: TabPanelProps) {
  return (
    <div
      className={
        "bg-white rounded-md h-full overflow-auto" + ` tab-panel-${name}`
      }
      style={{ display: isActive ? "block" : "none" }}
    >
      <TabProvider tabKey={{ name, type }}>
        <LoadingProvider>
          <div className="h-full overflow-auto">{children}</div>
        </LoadingProvider>
      </TabProvider>
    </div>
  );
}
