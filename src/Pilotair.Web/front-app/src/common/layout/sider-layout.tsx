import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import Header from "./header"
import { ReactNode } from "react";

interface Props {
    sider: ReactNode,
    content: ReactNode
}

export default function LeftMenuLayout({ sider, content }: Props) {
    return (
        < Layout className="absolute inset-0">
            <Header />
            <Layout>
                <Sider width={200} >
                    {sider}
                </Sider>
                <Layout className="p-1">
                    {content}
                </Layout>
            </Layout>
        </Layout >
    )
}