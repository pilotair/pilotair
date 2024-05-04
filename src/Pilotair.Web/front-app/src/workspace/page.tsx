import SiderLayout from "../common/layout/sider-layout"
import { Menu } from "antd"
import { Header } from "./header"
import { useWorkspace } from "./workspace-store";
import { useMemo } from "react";
import Tabs from "../common/tab/tabs";
import AsyncComponent from "../common/async-component";
import Empty from "../common/empty";
import Loading from "../common/loading";

export default function Workspace() {
    const { menus, tabs, openTab, closeTab, setActiveName, activeName, loading } = useWorkspace();

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
        openTab(key, menu.label, <AsyncComponent component={menu.feature.tab} />, menu.icon)
    }

    const sider = loading ? <Loading  className="!bg-transparent"/> : <Menu
        mode="inline"
        items={menus}
        onClick={({ key }) => onMenuItemClick(key)}
        selectedKeys={[activeName]}
        theme="dark"
        inlineIndent={12}
    />

    function Content() {
        if (!tabs.length) {
            return <Empty />
        }

        return <Tabs items={tabs} activeName={activeName} onTabClose={closeTab} onTabClick={setActiveName} />
    }

    const content = Content();

    return (
        <SiderLayout sider={sider} content={content} header={<Header />} />
    )
}

