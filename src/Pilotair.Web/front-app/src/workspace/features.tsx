import { HomeOutlined, PictureOutlined } from "@ant-design/icons"

export const features = [
    {
        name: 'home',
        label: "Home",
        icon: <HomeOutlined />,
        tab: () => import("../files/page")
    },
    {
        name: 'files',
        label: "Files",
        icon: <PictureOutlined />,
        tab: () => import("../files/page")
    }
]

export function getFeature(name: string) {
    return features.find(f => f.name == name);
}
