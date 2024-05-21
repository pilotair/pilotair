import { Pilotair } from "../schema";
import FolderContextMenu from "./folder-context-menu";
import { CodepenOutlined } from "@ant-design/icons";
import { MenuItem } from "../workspace/menu";
import CodeContextMenu from "./code-context-menu";
import AsyncComponent from "../common/async-component";
import { combine } from "../utils/path";

export function getCodesMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        icon: <span><FolderContextMenu path={menu.path}><CodepenOutlined /></FolderContextMenu></span>,
        label: <FolderContextMenu path={menu.path}>Codes</FolderContextMenu>,
        key: menu.type,
    }
}

export function getCodeFolderMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <FolderContextMenu path={menu.path}>{menu.name}</FolderContextMenu>,
        key: combine(menu.type, menu.path),
    }
}

export function getCodeMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <CodeContextMenu path={menu.path}>{menu.name}</CodeContextMenu>,
        key: combine(menu.type, menu.path),
        tab: <AsyncComponent component={() => import("./page")} />
    }
}