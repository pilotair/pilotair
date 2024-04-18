import SiderLayout from "../common/layout/sider-layout"
import { Menu, MenuContextProvider } from "./Sider"
import { Content, TabsContextProvider } from "./Content"
import { Header } from "./Header"
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