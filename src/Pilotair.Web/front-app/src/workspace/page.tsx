import SiderLayout from "../common/layout/sider-layout"
import { Menu } from "antd"
import { useMenu } from "./menu";
import { useTabs } from "./tabs";
import { useContext, useEffect, useMemo, useState } from "react";
import Tabs from "../common/tab/tabs";
import AsyncComponent from "../common/async-component";
import Empty from "../common/empty";
import { AppstoreOutlined, BranchesOutlined, SettingOutlined } from "@ant-design/icons";
import { SiderLayoutContext } from "../common/layout/sider-layout-context";
import Avatar from "@/common/profile/avatar";
import { useNavigate } from "@/common/router";
import FoldUp from "@/assets/fold-up.svg"


function Sider() {
    const { menus, loadMenus } = useMenu();
    const { collapsed } = useContext(SiderLayoutContext)
    const { openTab, activeName } = useTabs();
    const nav = useNavigate()
    const [openKeys, setOpenKeys] = useState<string[]>([])


    useEffect(() => {
        loadMenus();
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

    const menu = <Menu
        mode="inline"
        items={menus}
        onClick={({ key }) => onMenuItemClick(key)}
        selectedKeys={[activeName]}
        theme="dark"
        inlineIndent={12}
        openKeys={openKeys}
        onOpenChange={(keys: string[]) => setOpenKeys(keys)}
    />

    function onMenuItemClick(key: string) {
        const menu = expandMenus.find(f => f.key == key);
        if (!menu || !menu.tab) return;
        openTab(key, menu.tabLabel ?? menu.label, menu.tab, menu.tabIcon ?? menu.icon)
    }

    function onMoreClick() {
        openTab(
            "features",
            "Features",
            <AsyncComponent component={() => import("./feature/page")} />,
            <AppstoreOutlined />
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto ">
                {menu}
            </div>
            {!!openKeys.length && !collapsed && <div className="flex justify-center hover:bg-slate-200/10 py-1" onClick={() => setOpenKeys([])}>
                <img className="h-4" src={FoldUp} />
            </div>}
            <div className={"flex-shrink-0 text-slate-200 grid " + (collapsed ? "grid-cols-1" : "grid-cols-3")} >
                <div className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2" onClick={() => nav('/home')}>
                    <BranchesOutlined className="text-xl" />
                    <span className="text-xs transform scale-75">Changes</span>
                </div>
                <div className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2">
                    <SettingOutlined className="text-xl" />
                    <span className="text-xs transform scale-75">Settings</span>
                </div>
                <div className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2" onClick={onMoreClick}>
                    <AppstoreOutlined className="text-xl" />
                    <span className="text-xs transform scale-75">More</span>
                </div>
            </div>
        </div>
    )
}

export default function Workspace() {
    const { tabs, closeTab, setActiveName, activeName } = useTabs();

    function Content() {
        if (!tabs.length) {
            return <Empty />
        }

        return <Tabs items={tabs} activeName={activeName} onTabClose={closeTab} onTabClick={setActiveName} />
    }

    function Header() {
        return <>
            <div className="flex-1"></div>
            <Avatar />
        </>
    }

    return (
        <SiderLayout sider={<Sider />} content={<Content />} header={<Header />} />
    )
}

