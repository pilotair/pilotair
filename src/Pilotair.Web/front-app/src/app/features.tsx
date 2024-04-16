import { lazy, Suspense } from "react"
import { HomeOutlined, PictureOutlined } from "@ant-design/icons"

const features = [
    {
        name: 'home',
        icon: <HomeOutlined />,
        tab: () => import("./testTab")
    },
    {
        name: 'files',
        icon: <PictureOutlined />,
        tab: () => import("./testTab")
    }
]

interface Props {
    name: string
}

export function Tab({ name }: Props) {
    const item = features.find(f => f.name == name);
    const Tab = lazy(item!.tab)
    return <Suspense fallback={<div>404</div>} children={<Tab />} />

}