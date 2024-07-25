import { createContext, ReactNode } from "react";
import { ModalProvider } from "@/common/modals/context";

interface Tab {
  name: string;
}

export const TabContext = createContext<Tab>({} as Tab);

interface Props {
  children: ReactNode;
  name: string;
}

export function TabProvider({ children, name }: Props) {
  return (
    <TabContext.Provider value={{ name }}>
      <div className="relative h-full">
        <ModalProvider>{children}</ModalProvider>
      </div>
    </TabContext.Provider>
  );
}
