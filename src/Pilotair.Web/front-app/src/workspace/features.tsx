import { FileOutlined, HomeOutlined, JavaScriptOutlined, PictureOutlined } from "@ant-design/icons"
import { ReactNode } from "react";

interface Feature {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tab?: any
}

export const features: Feature[] = [
    {
        name: 'Home',
        label: "Home",
        icon: <HomeOutlined />,
        tab: () => import("../home/page")
    },
    {
        name: 'Files',
        label: "Files",
        icon: <PictureOutlined />,
        tab: () => import("../files/page")
    },
    {
        name: 'Codes',
        label: "Codes",
        icon: <JavaScriptOutlined />,
        tab: () => import("../files/page")
    },
    {
        name: 'CodeFolder',
        label: (value) => value,
        tab: () => import("../files/page")
    },
    {
        name: 'Code',
        icon: <FileOutlined />,
        label: (value) => value,
        tab: () => import("../files/page")
    }
]

export function getFeature(name: string) {
    return features.find(f => f.name == name);
}
