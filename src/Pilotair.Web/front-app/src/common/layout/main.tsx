import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import Header from "./header"

const { Content } = Layout

export default function RootLayout() {
    return (
        <Layout className="absolute inset-0">
            <Header></Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}