import SiderLayout from "../common/layout/sider-layout"
import { Menu, MenuContextProvider } from "./sider"
import { Content, TabsContextProvider } from "./content"
import { Header } from "./header"
import { WorkspaceStateProvider } from "./workspace"

export default function App() {
    return <WorkspaceStateProvider>
        <MenuContextProvider>
            <TabsContextProvider>
                <SiderLayout sider={<Menu />} content={<Content />} header={<Header />} />
            </TabsContextProvider>
        </MenuContextProvider>
    </WorkspaceStateProvider>
}   