import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ReactNode, useState } from "react";
import LogoIcon from "../../assets/logo.svg"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

interface Props {
    sider: ReactNode,
    content: ReactNode,
    header: ReactNode
}

export default function LeftMenuLayout({ sider, content, header }: Props) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout className="absolute inset-0">
            <Sider collapsible theme="dark" trigger={null} collapsed={collapsed}>
                <div className="px-5 h-12 flex flex-shrink-0 items-center">
                    <img onClick={() => setCollapsed(false)} className="w-10 h-10 cursor-pointer" src={LogoIcon} alt="pilotair" />
                    <div className="flex-1"></div>
                    {!collapsed && <MenuFoldOutlined onClick={() => setCollapsed(true)} className="text-white hover:text-blue-400" />}
                </div>
                {sider}
            </Sider>
            <Layout>
                <div className="flex flex-col h-full">
                    <div className="h-12 bg-white shadow-sm flex flex-shrink-0 items-center px-4 relative">
                        {collapsed && <MenuUnfoldOutlined onClick={() => setCollapsed(false)} className="hover:text-blue-400" />}
                        <div className="flex-1 flex">
                            {header}
                        </div>
                    </div>
                    <div className="p-2 flex-1 overflow-auto">
                        {content}
                    </div>
                </div>
            </Layout>
        </Layout>
    )
}