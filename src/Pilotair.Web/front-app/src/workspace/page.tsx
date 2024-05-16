import SiderLayout from "../common/layout/sider-layout"
import { Menu } from "antd"
import { Header } from "./header"
import { useWorkspace } from "./workspace-store";
import { useMemo } from "react";
import Tabs from "../common/tab/tabs";
import AsyncComponent from "../common/async-component";
import Empty from "../common/empty";
import { AppstoreOutlined } from "@ant-design/icons";
import { features } from "./features";

export default function Workspace() {
    const { menus, tabs, openTab, closeTab, setActiveName, activeName } = useWorkspace();

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

    function onMoreClick() {
        const feature = features.find(f => f.name == "Features");
        if (!feature) return;
        openTab(feature.name, feature.label as string, <AsyncComponent component={feature.tab!} />, feature.icon)
    }

    const menu = <Menu
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
    const sider = (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {menu}
            </div>
            <div className="flex-shrink-0 flex flex-col justify-center items-center py-2 text-slate-200 hover:bg-slate-50/10 cursor-pointer" onClick={onMoreClick}>
                <AppstoreOutlined className="text-xl" />
                <span className="text-xs transform scale-75">MORE</span>
            </div>
        </div>
    );

    return (
        <SiderLayout sider={sider} content={content} header={<Header />} />
    )
}

