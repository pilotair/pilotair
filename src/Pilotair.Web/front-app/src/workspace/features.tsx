import { CodepenOutlined, ControlOutlined, FileOutlined, FolderOutlined, FormOutlined } from "@ant-design/icons"
import { ReactNode } from "react";
import MoreBtn from "../common/menu/more-btn";
import { menu as codeFolderMenu } from "../code/folder-more-menu"
import OptionsFolderLabel from "../options/folder-label"
import { Dropdown } from "antd";

interface Feature {
    name: string;
    label?: ReactNode | ((value: ReactNode) => ReactNode),
    icon?: ReactNode,
    tab?: () => Promise<{ default: React.ComponentType<unknown>; }>
}

const features: Feature[] = [
    {
        name: 'Files',
        label: "Files",
        icon: <FolderOutlined />,
        tab: () => import("../files/page")
    },
    {
        name: 'Codes',
        label: <Dropdown trigger={["contextMenu"]} menu={codeFolderMenu}><div>Codes</div></Dropdown>,
        icon: <CodepenOutlined />,
    },
    {
        name: 'CodeFolder',
        label: (value) => <Dropdown trigger={["contextMenu"]} menu={codeFolderMenu}><div>{value}</div></Dropdown>,
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
        label: <MoreBtn label="Contents" menu={codeFolderMenu} />,
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
