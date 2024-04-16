import SiderLayout from "../common/layout/sider-layout"
import { Menu, MenuContextProvider } from "./menu"
import { Tabs, TabsContextProvider } from "./tabs"
import { WorkspaceStateProvider } from "./workspace"

export default function App() {
    return <WorkspaceStateProvider>
        <MenuContextProvider>
            <TabsContextProvider>
                <SiderLayout sider={<Menu />} content={<Tabs />} />
            </TabsContextProvider>
        </MenuContextProvider>
    </WorkspaceStateProvider>
}   