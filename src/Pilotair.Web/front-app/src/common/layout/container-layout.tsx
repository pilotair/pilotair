import { Layout, Menu, MenuProps } from "antd";
import { Outlet, useMatches, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg"
import { ClusterOutlined, GlobalOutlined } from "@ant-design/icons";
import { useMemo } from "react";

export default function ContainerLayout() {
    const { Content, Header } = Layout
    const matches = useMatches()
    const navigate = useNavigate()

    const items: (NonNullable<MenuProps['items']>[0] & { route: string })[] = [
        {
            icon: <ClusterOutlined />,
            label: "Projects",
            key: "projects",
            route: "/"
        },
        {
            icon: <GlobalOutlined />,
            label: "Domains",
            key: "domains",
            route: "/domains"
        }
    ];

    const selectedKeys = useMemo(() => {
        const result = [];

        for (const item of items) {
            if (matches.find(f => f.id == item?.key)) {
                result.push(item.key as string)
            }
        }

        return result;
    }, [matches])

    function onClick(key: string) {
        const found = items.find(f => f.key == key);
        if (found) navigate(found.route);
    }

    return (
        <Layout className="absolute inset-0">
            <Header className="flex items-center space-x-2 shadow-md relative">
                <img className="w-10 h-10 cursor-default" src={LogoIcon} alt="pilotair" />
                <h3 className="text-slate-200">Pilotair</h3>
                <div className="w-6"></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={selectedKeys}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onClick={(i) => onClick(i.key)}
                />
            </Header>
            <div className="h-full overflow-y-auto">
                <Content className="container mx-auto">
                    <Outlet />
                </Content>
            </div>
        </Layout>
    )
}