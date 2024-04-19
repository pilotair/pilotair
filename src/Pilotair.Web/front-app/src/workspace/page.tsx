import SiderLayout from "../common/layout/sider-layout"
import { Empty, Menu } from "antd"
import { Header } from "./header"
import { useWorkspaceStore } from "./workspace-store";
import { useEffect } from "react";
import Tabs from "../common/tab/tabs";

export default function App() {
    const { menus, tabs, openTab, closeTab, setActiveName, activeName, loadMenus } = useWorkspaceStore();

    useEffect(() => {
        loadMenus()
    }, [loadMenus])

    const sider = <Menu
        mode="inline"
        items={menus}
        onClick={({ key }) => openTab(key)}
        selectedKeys={[activeName]}
        theme="dark"
    />

    function Content() {
        if (!tabs.length) {
            return <Empty className="h-full flex items-center justify-center" description={false} />
        }

        return <Tabs items={tabs} activeName={activeName} onTabClose={closeTab} onTabClick={setActiveName} />
    }

    const content = Content();

    return (
        <SiderLayout sider={sider} content={content} header={<Header />} />
    )
}

