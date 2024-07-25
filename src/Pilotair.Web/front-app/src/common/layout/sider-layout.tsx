import { Layout } from "antd";
import { ReactNode, useState } from "react";
import LogoIcon from "@/assets/logo.svg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Resizable } from "react-resizable";
import { SiderLayoutContext } from "./sider-layout-context";

interface Props {
  sider: ReactNode;
  content: ReactNode;
  header: ReactNode;
}

const { Sider } = Layout;

export default function LeftMenuLayout({ sider, content, header }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [siderWidth, setSiderWidth] = useState(200);
  const [resizableWidth, setResizableWidth] = useState(siderWidth);

  function handleResize(_e: unknown, { size }: { size: { width: number } }) {
    setResizableWidth(size.width);
    setSiderWidth(size.width < 200 ? 200 : size.width > 480 ? 480 : size.width);
  }

  function handleResizeStart() {
    setResizing(true);
    setResizableWidth(siderWidth);
  }

  function handleResizeStop() {
    setResizing(false);
    setResizableWidth(siderWidth);
  }

  return (
    <SiderLayoutContext.Provider value={{ collapsed: collapsed }}>
      <Layout className="absolute inset-0 min-h-[500px] min-w-[1280px]">
        <Resizable
          className={resizing ? "!transition-none" : ""}
          width={resizableWidth}
          onResize={handleResize}
          axis="x"
          handle={
            <div className="absolute w-1 top-0 bottom-0 right-[-2px] cursor-ew-resize hover:bg-sky-500 z-50" />
          }
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          <Sider
            collapsible
            theme="dark"
            trigger={null}
            collapsed={collapsed}
            width={siderWidth < 200 ? 200 : siderWidth > 480 ? 480 : siderWidth}
            breakpoint="xl"
            onBreakpoint={setCollapsed}
          >
            <div className="flex flex-col h-full">
              <div
                className={
                  (collapsed ? "px-5" : "px-3") +
                  " h-12 flex flex-shrink-0 items-center shadow-md relative bg-slate-800 transition-all duration-300 space-x-2"
                }
              >
                <img
                  className="w-10 h-10 cursor-default"
                  src={LogoIcon}
                  alt="pilotair"
                />
                {!collapsed && (
                  <div className="flex-1 text-slate-200 font-bold truncate">
                    Pilotair
                  </div>
                )}
                <MenuFoldOutlined
                  onClick={() => setCollapsed(true)}
                  className={
                    "transition-all duration-300 text-white hover:text-blue-400 " +
                    (collapsed
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100")
                  }
                />
              </div>
              <div className="flex-1 overflow-y-hidden">{sider}</div>
            </div>
          </Sider>
        </Resizable>

        <Layout>
          <div className="flex flex-col h-full">
            <div className="h-12 bg-white shadow-sm flex flex-shrink-0 items-center px-2 relative">
              {collapsed && (
                <MenuUnfoldOutlined
                  onClick={() => setCollapsed(false)}
                  className="hover:text-blue-400"
                />
              )}
              <div className="flex-1 flex">{header}</div>
            </div>
            <div className="p-2 flex-1 overflow-auto">{content}</div>
          </div>
        </Layout>
      </Layout>
    </SiderLayoutContext.Provider>
  );
}
