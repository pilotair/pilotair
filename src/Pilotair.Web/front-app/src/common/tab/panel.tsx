import { ReactNode } from "react";
import { TabContextProvider } from "./context";

interface TabPanelProps {
    children: ReactNode,
    name: string,
    isActive: boolean
}

export default function TabPanel({ children, name, isActive }: TabPanelProps) {
    return (
        <TabContextProvider name={name}>
            <div
                className={"bg-white rounded-md h-full overflow-auto relative" + ` tab-panel-${name}`}
                style={{ display: isActive ? 'block' : 'none' }}
            >
                <div className="h-full overflow-auto">
                    {children}
                </div>
            </div>
        </TabContextProvider>
    )
}