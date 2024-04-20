import SiderLayout from "../common/layout/sider-layout"
import { Empty, Menu } from "antd"
import { Header } from "./header"
import { useWorkspaceStore } from "./workspace-store";
import { useEffect, useMemo } from "react";
import Tabs from "../common/tab/tabs";

export default function App() {
    const { menus, tabs, openTab, closeTab, setActiveName, activeName, loadMenus } = useWorkspaceStore();

    useEffect(() => {
        loadMenus()
    }, [loadMenus])

    const expandMenus = useMemo(() => {
        const result: typeof menus = []

        function getMenus(items: typeof menus) {
            for (const menu of items) {
                result.push(menu);
                if (menu.children) {
                    getMenus(menu.children)
                }
            }
        }

        getMenus(menus)
        return result;
    }, [menus])

    function onMenuItemClick(key: string) {
        const menu = expandMenus.find(f => f.key == key);
        if (!menu || !menu.feature?.tab) return;
        openTab(key, menu.label, menu.feature.tab, menu.icon)
    }

    const sider = <Menu
        mode="inline"
        items={menus}
        onClick={({ key }) => onMenuItemClick(key)}
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

