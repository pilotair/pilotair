import { CodepenOutlined, FileOutlined } from "@ant-design/icons";
import { FeatureItem } from "../workspace/features"
import FolderContextMenu from "./folder-context-menu";
import CodeContextMenu from "./code-context-menu";

const codesFeature: FeatureItem = {
    name: 'Codes',
    label: <FolderContextMenu>Codes</FolderContextMenu>,
    icon: <span><FolderContextMenu><CodepenOutlined /></FolderContextMenu></span>,
};

const codeFolderFeature: FeatureItem = {
    name: 'CodeFolder',
    label: (value) => <FolderContextMenu>{value}</FolderContextMenu>,
};

const codeFeature: FeatureItem = {
    name: 'Code',
    icon: <span><CodeContextMenu><FileOutlined /></CodeContextMenu></span>,
    label: (value) => <CodeContextMenu>{value}</CodeContextMenu>,
    tab: () => import("../code/page")
};


export const codeFeatures = [codesFeature, codeFolderFeature, codeFeature]