import { Pilotair } from "../../schema";
import FolderContextMenu from "./folder-context-menu";
import { FunctionOutlined } from "@ant-design/icons";
import { MenuItem } from "../../workspace/menu";
import CodeContextMenu from "./code-context-menu";
import AsyncComponent from "../../common/async-component";

export function getCodesMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        icon: <span><FolderContextMenu path={menu.path}><FunctionOutlined /></FolderContextMenu></span>,
        label: <FolderContextMenu path={menu.path}>Codes</FolderContextMenu>,
        key: menu.path,
    }
}

export function getCodeFolderMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <FolderContextMenu path={menu.path}>{menu.name}</FolderContextMenu>,
        key: menu.path,
    }
}

export function getCodeMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <CodeContextMenu path={menu.path}>{menu.name}</CodeContextMenu>,
        key: menu.path,
        tab: <AsyncComponent component={() => import("./page")} props={{
            name: menu.name,
            folder: menu.folder
        }} />
    }
}