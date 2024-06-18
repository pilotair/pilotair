import ContainerLayout from "@/common/layout/container-layout"
import Avatar from "@/common/profile/avatar";
import { ClusterOutlined, GlobalOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useMemo } from "react";
import { useMatches, useNavigate } from "react-router-dom";

export default function Home() {

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

    function Header() {
        return <>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={selectedKeys}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                onClick={(i) => onClick(i.key)}
            />
            <div className="flex-1"></div>
            <Avatar />
        </>
    }

    return (
        <ContainerLayout header={<Header />} />
    );
}