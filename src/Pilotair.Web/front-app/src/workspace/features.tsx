import { AppstoreOutlined, CodepenOutlined, ControlOutlined, FileOutlined, FolderOutlined, FormOutlined } from "@ant-design/icons"
import { ReactNode } from "react";
import AddCodeBtn from "../code/add-code-btn";

interface Feature {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    tab?: () => Promise<{ default: React.ComponentType<unknown>; }>
}

const features: Feature[] = [
    {
        name: 'Features',
        label: "Features",
        icon: <AppstoreOutlined />,
        tab: () => import("../feature/page")
    },
    {
        name: 'Files',
        label: "Files",
        icon: <FolderOutlined />,
        tab: () => import("../files/page")
    },
    {
        name: 'Codes',
        label: <AddCodeBtn />,
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
    },
    {
        name: 'Contents',
        icon: <FormOutlined />,
        label: "Contents",
        tab: () => import("../code/page")
    },
    {
        name: 'Options',
        icon: <ControlOutlined />,
        label: "Options",
        tab: () => import("../code/page")
    }
]

export function getFeature(name: string) {
    return features.find(f => f.name == name);
}
