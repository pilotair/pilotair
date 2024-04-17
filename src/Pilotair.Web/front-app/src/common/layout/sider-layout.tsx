import { Layout, Dropdown, Avatar, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { ReactNode, useState } from "react";
import LogoIcon from "../../assets/logo.svg"
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons"

interface Props {
    sider: ReactNode,
    content: ReactNode
}


const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
];

export default function LeftMenuLayout({ sider, content }: Props) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout className="absolute inset-0">
            <Sider collapsible theme="dark" trigger={null} collapsed={collapsed} className="overflow-hidden">
                <div className="px-5 h-12 flex items-center">
                    <img onClick={() => setCollapsed(false)} className="w-10 h-10 cursor-pointer" src={LogoIcon} alt="pilotair" />
                    <div className="flex-1"></div>
                    {!collapsed && <MenuFoldOutlined onClick={() => setCollapsed(true)} className="text-white" />}
                </div>
                {sider}
            </Sider>
            <Layout>
                <div className="h-12 bg-white shadow-sm flex items-center px-4 relative">
                    <div className="flex-1"></div>
                    <Dropdown menu={{ items }}>
                        <Avatar className="bg-slate-300" icon={<UserOutlined />} />
                    </Dropdown>
                </div>
                <div className="p-1 h-full">
                    {content}
                </div>
            </Layout>
        </Layout>
    )
}