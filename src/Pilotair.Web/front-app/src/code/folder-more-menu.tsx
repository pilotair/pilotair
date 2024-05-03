import { MenuProps } from "antd";

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
        label: "Add file"
    }, {
        key: "folder",
        label: "Add folder"
    }, {
        key: "router",
        label: "Add router"
    }],
    onClick: onItemClick
}