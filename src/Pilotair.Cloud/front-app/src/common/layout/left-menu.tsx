import {Layout, Menu, } from "antd";
import Sider from "antd/es/layout/Sider";
import Logo from "./logo"
import Breadcrumb from "../breadcrumb"

const { Header, Content } = Layout

export default function LeftMenuLayout() {
    return (
        < Layout className="absolute inset-0">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Logo />
            </Header>
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
                           title:"app"
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