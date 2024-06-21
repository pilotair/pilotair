import ContainerLayout from "@/common/layout/container-layout"
import Avatar from "@/common/profile/avatar";
import { ClusterOutlined, GlobalOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import Projects from "./projects/page"
import Domains from "./domains/page"

export default function Home() {
    const [location, setLocation] = useLocation()

    const items = [
        {
            icon: <ClusterOutlined />,
            label: "Projects",
            key: "projects",
            route: "/projects",
            component: Projects
        },
        {
            icon: <GlobalOutlined />,
            label: "Domains",
            key: "domains",
            route: "/domains",
            component: Domains
        }
    ];

    const selectedKeys = useMemo(() => {
        const found = items.find(f => f.route == location);
        return [found?.key || '']
    }, [location])

    function onClick(key: string) {
        const found = items.find(f => f.key == key);
        if (found) setLocation(found.route);
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
        <ContainerLayout header={<Header />} >
            <Switch>
                {items.map(m => <Route path={m.route} key={m.key} component={m.component} />)}
                <Redirect to="/projects" />
            </Switch>
        </ContainerLayout>
    );
}