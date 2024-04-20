import { CodepenOutlined, FileOutlined, HomeOutlined, PictureOutlined } from "@ant-design/icons"
import { ReactNode } from "react";

interface Feature {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    tab?: () => Promise<{ default: React.ComponentType<unknown>; }>
}

const features: Feature[] = [
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
        icon: <CodepenOutlined />,
    },
    {
        name: 'CodeFolder',
        label: (value) => value,
    },
    {
        name: 'Code',
        icon: <FileOutlined />,
        label: (value) => value,
        tab: () => import("../code/page")
    }
]

export function getFeature(name: string) {
    return features.find(f => f.name == name);
}
