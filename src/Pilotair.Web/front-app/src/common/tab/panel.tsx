import { ReactNode } from "react";
import { TabContextProvider } from "./context";
import { LoadingProvider } from "../loading-context";

interface TabPanelProps {
    children: ReactNode,
    name: string,
    isActive: boolean
}

export default function TabPanel({ children, name, isActive }: TabPanelProps) {
    return (

        <div
            className={"bg-white rounded-md h-full overflow-auto" + ` tab-panel-${name}`}
            style={{ display: isActive ? 'block' : 'none' }}
        >
            <TabContextProvider name={name}>
                <LoadingProvider>
                    <div className="h-full overflow-auto">
                        {children}
                    </div>
                </LoadingProvider>
            </TabContextProvider>
        </div>

    )
}