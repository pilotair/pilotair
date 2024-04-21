import { CodepenOutlined, FileOutlined, HomeOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons"
import { Dropdown } from "antd";
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
        label: <div className="flex group"><div className="flex-1">Codes</div><Dropdown trigger={["click"]} menu={{
            items: [{
                key: "file",
                label: "Add file"
            }, {
                key: "folder",
                label: "Add folder"
            }, {
                key: "router",
                label: "Add router"
            }],
        }}><PlusOutlined className="opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()} /></Dropdown></div>,
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
