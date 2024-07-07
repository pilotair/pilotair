import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, RedoOutlined, ReloadOutlined } from "@ant-design/icons";
import { MenuItem } from "./context-menu";
import { Key } from "react";
import { MenuItemKey } from "./constants";

export function getMenuItem(key?: Key): MenuItem | undefined {

    switch (key as MenuItemKey) {
        case "new":
            return {
                key: "new",
                label: <span>New</span>,
                icon: <PlusOutlined />,
                title: "New"
            }
        case "edit":
            return {
                key: "edit",
                label: <span>Edit</span>,
                icon: <EditOutlined />,
                title: "New"
            }
        case "delete":
            return {
                key: "delete",
                label: <span>Delete</span>,
                icon: <DeleteOutlined />,
                title: "Delete",
                danger: true
            }
        case "rename":
            return {
                key: "rename",
                label: <span>Rename</span>,
                icon: <RedoOutlined />,
                title: "Rename"
            }
        case "close":
            return {
                key: "close",
                label: <span>Close</span>,
                icon: <CloseOutlined />,
                title: "Close",
                danger: true
            }
        case "reload":
            return {
                key: "reload",
                label: <span>Reload</span>,
                icon: <ReloadOutlined />,
                title: "Reload"
            }
        default:
            break;
    }
}