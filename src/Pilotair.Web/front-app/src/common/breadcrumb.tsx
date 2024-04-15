import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb as AntdBreadcrumb } from "antd"

export interface Item {
    href?: string,
    title: React.ReactNode
}

export default function Breadcrumb({ items }: { items: Item[] }) {
    return <AntdBreadcrumb
        items={[
            {
                href: '/',
                title: <HomeOutlined />,
            },
            ...items
        ]}
    />
}