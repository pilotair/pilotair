import { AppstoreOutlined, CodepenOutlined, ControlOutlined, FileOutlined, FolderOutlined, FormOutlined } from "@ant-design/icons"
import { ReactNode } from "react";
import CodeFolderContextMenu from "../code/folder-context-menu"
import OptionsFolderLabel from "../options/folder-label"

interface Feature {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    tab?: () => Promise<{ default: React.ComponentType<unknown>; }>
}

export const features: Feature[] = [
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
        label: <CodeFolderContextMenu>Codes</CodeFolderContextMenu>,
        icon: <CodepenOutlined /> ,
    },
    {
        name: 'CodeFolder',
        label: (value) => <CodeFolderContextMenu>{value}</CodeFolderContextMenu>,
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
        label: <div>Contents</div>,
    },
    {
        name: 'Options',
        icon: <ControlOutlined />,
        label: <OptionsFolderLabel />,
    }
]

export function getFeature(name: string) {
    return features.find(f => f.name == name);
}
