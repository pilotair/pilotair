import { Layout, Menu, Tabs, TabsProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Header from "./header"
import { useLoaderData } from "react-router-dom"
import React, { ReactNode, useState } from "react";
import { Icon } from "../Icon"
import { TestTab } from './testTab'

interface MenuItem {
    order: number,
    label: string,
    icon: string
}

type TabItems = NonNullable<TabsProps["items"]>
type AntdMenuItem = { key: string, icon: ReactNode, label: string }

export default function LeftMenuLayout() {
    const data = useLoaderData() as MenuItem[];

    const [tabs, setTabs] = useState<TabItems>([]);
    const [selectedKey, setSelectedKey] = useState('')

    function getItems() {
        const result: AntdMenuItem[] = [];

        for (const item of data) {
            result.push({
                key: item.label,
                icon: <Icon name={item.icon} />,
                label: item.label
            })
        }

        return result;
    }

    const menuItems = getItems();

    function menuItemClick({ key }: { key: string }) {
        const menuItem = menuItems.find(f => f?.key == key);
        if (!menuItem) return;
        let tab = tabs.find(f => f.key == menuItem.key);

        if (!tab) {
            tab = {
                key: menuItem.key,
                label: menuItem.label,
                icon: menuItem.icon,
                children: <TestTab />
            }
            setTabs([...tabs, tab]);
        }

        setSelectedKey(tab.key)
    }

    function tabClick(key: string) {
        const menuItem = menuItems.find(f => f?.key == key);
        if (!menuItem) return;

        setSelectedKey(menuItem.key)
    }

    const onTabEdit = (
        targetKey: string | React.MouseEvent | React.KeyboardEvent,
        action: 'add' | 'remove',
    ) => {
        if (action !== 'remove') return;
        setTabs(tabs.filter(f => f.key != targetKey))
        setSelectedKey('')
    };

    return (
        < Layout className="absolute inset-0">
            <Header />
            <Layout>
                <Sider width={200} >
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                        onClick={menuItemClick}
                        selectedKeys={[selectedKey]}
                    />
                </Sider>
                <Layout className="p-1">
                    <Tabs className="bg-white h-full rounded-md" type="editable-card" items={tabs} hideAdd onEdit={onTabEdit} activeKey={selectedKey} onTabClick={tabClick} tabBarStyle={{backgroundColor:"#f5f5f5"}}/>
                </Layout>
            </Layout>
        </Layout >
    )
}