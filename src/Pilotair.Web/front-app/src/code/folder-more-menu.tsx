import { MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons"

function onItemClick({ key }: { key: string }) {
    switch (key) {
        case "file":
            break;

        default:
            break;
    }
}

export const menu: MenuProps = {
    items: [{
        key: "file",
        label: <div>Add file</div>,
        icon: <PlusOutlined />,
        title: ""
    }, {
        key: "folder",
        label: "Add folder"
    }, {
        key: "router",
        label: "Add router"
    }],
    onClick: onItemClick
}