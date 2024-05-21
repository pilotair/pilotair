import { AppstoreOutlined, ControlOutlined, FolderOutlined, FormOutlined } from "@ant-design/icons"
import { ReactNode } from "react";
import OptionsFolderLabel from "../options/folder-label"
import { codeFeatures } from "../code/code-features";

export interface FeatureItem {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    tab?: () => Promise<{ default: React.ComponentType<unknown>; }>,
}

export const features: FeatureItem[] = [
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
    ...codeFeatures,
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

export function getFeature(name: string): FeatureItem {
    const feature = features.find(f => f.name == name);
    if (!feature) {
        throw Error(`feature '${name}' not found`)
    }
    return feature;
}
