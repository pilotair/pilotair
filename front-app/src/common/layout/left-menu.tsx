import { Layout, Menu, } from "antd";
import Sider from "antd/es/layout/Sider";
import Breadcrumb from "../breadcrumb"
import Header from "./header"

const { Content } = Layout

export default function LeftMenuLayout() {
    return (
        < Layout className="absolute inset-0">
            <Header />
            <Layout>
                <Sider width={200} >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb items={[
                        {
                            title: "app"
                        }
                    ]}>
                    </Breadcrumb>
                    <Content

                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )


}