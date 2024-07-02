import SiderLayout from "../common/layout/sider-layout"
import { useTabs } from "./tabs";
import { useContext, useState } from "react";
import Tabs from "../common/tab/tabs";
import AsyncComponent from "../common/async-component";
import Empty from "../common/empty";
import { AppstoreOutlined, BranchesOutlined, SettingOutlined } from "@ant-design/icons";
import { SiderLayoutContext } from "../common/layout/sider-layout-context";
import Avatar from "@/common/profile/avatar";
import { useNavigate } from "@/common/router";
import FoldUp from "@/assets/fold-up.svg"
import Menu from "./menu"


function Sider() {
    const { collapsed } = useContext(SiderLayoutContext)
    const { openTab } = useTabs();
    const nav = useNavigate()
    const [openKeys, setOpenKeys] = useState<string[]>([])

   

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
                <Menu />
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

