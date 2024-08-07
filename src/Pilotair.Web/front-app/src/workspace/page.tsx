import SiderLayout from "../common/layout/sider-layout";
import { useContext, useEffect, useState } from "react";
import Tabs from "@/common/tab/tabs";
import AsyncComponent from "@/common/basic/async-component";
import Empty from "@/common/basic/empty";
import {
  AppstoreOutlined,
  BranchesOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SiderLayoutContext } from "../common/layout/sider-layout-context";
import Avatar from "@/common/profile/avatar";
import { useNavigate } from "@/common/router";
import FoldUp from "@/assets/fold-up.svg";
import LeftMenu from "./left-menu";
import { useMenu } from "./use-menu";
import { useEvent } from "@/common/events/event";
import { deleteMenu, reloadMenus } from "@/common/events/sources";
import { TabsContext, TabsProvider } from "./main-tabs";

function Sider() {
  const { collapsed } = useContext(SiderLayoutContext);
  const { openTab, closeTab } = useContext(TabsContext);
  const { loadMenus } = useMenu();
  const nav = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEvent(reloadMenus, loadMenus);
  useEvent(deleteMenu, closeTab);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  function handleMoreClick() {
    openTab({
      name: "features",
      label: "Features",
      panel: <AsyncComponent component={() => import("./feature/page")} />,
      icon: <AppstoreOutlined />,
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto ">
        <LeftMenu />
      </div>
      {!!openKeys.length && !collapsed && (
        <div
          className="flex justify-center hover:bg-slate-200/10 py-1"
          onClick={() => setOpenKeys([])}
        >
          <img className="h-4" src={FoldUp} />
        </div>
      )}
      <div
        className={
          "flex-shrink-0 text-slate-200 grid " +
          (collapsed ? "grid-cols-1" : "grid-cols-3")
        }
      >
        <div
          className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2"
          onClick={() => nav("/home")}
        >
          <BranchesOutlined className="text-xl" />
          <span className="text-xs transform scale-75">Changes</span>
        </div>
        <div className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2">
          <SettingOutlined className="text-xl" />
          <span className="text-xs transform scale-75">Settings</span>
        </div>
        <div
          className="flex flex-1 flex-col items-center cursor-pointer hover:bg-slate-50/10 p-2"
          onClick={handleMoreClick}
        >
          <AppstoreOutlined className="text-xl" />
          <span className="text-xs transform scale-75">More</span>
        </div>
      </div>
    </div>
  );
}

function Content() {
  const { tabs, activeKey, setActiveKey, closeTab } = useContext(TabsContext);
  if (!tabs.length) {
    return <Empty />;
  }

  return (
    <Tabs
      items={tabs}
      activeKey={activeKey}
      onTabClose={closeTab}
      onTabClick={setActiveKey}
    />
  );
}

export default function Workspace() {
  return (
    <TabsProvider>
      <SiderLayout
        sider={<Sider />}
        content={<Content />}
        header={<Header />}
      />
    </TabsProvider>
  );
}

function Header() {
  return (
    <>
      <div className="flex-1"></div>
      <Avatar />
    </>
  );
}
