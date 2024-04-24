import { Layout } from "antd"
import { Outlet } from "react-router-dom"

const { Content } = Layout

export default function BlankLayout() {
    return (
        <Layout className="absolute inset-0">
            <Content className="flex flex-col justify-center items-center">
                <Outlet />
            </Content>
        </Layout>
    )
}