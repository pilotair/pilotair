import { Layout } from "antd"
import Logo from "./logo"
import { Outlet } from "react-router-dom"

const { Header, Content } = Layout

export default function RootLayout() {
    return (
        <Layout className="absolute inset-0">
            <Header>
                <Logo />
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}