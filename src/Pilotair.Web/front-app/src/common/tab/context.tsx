import { createContext } from "react";
import { ModalProvider } from "@/common/modals/context";
import { TabKey } from "./tabs";
import { ChildrenProps } from "../types";

export const TabContext = createContext(
  {} as {
    tabKey: TabKey;
  },
);

type Props = ChildrenProps & {
  tabKey: TabKey;
};

export function TabProvider({ children, tabKey }: Props) {
  return (
    <TabContext.Provider value={{ tabKey }}>
      <div className="relative h-full">
        <ModalProvider>{children}</ModalProvider>
      </div>
    </TabContext.Provider>
  );
}
