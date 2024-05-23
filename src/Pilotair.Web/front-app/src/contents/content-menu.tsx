import { Pilotair } from "../schema";
import ContentsContextMenu from "./contents-context-menu";
import { FormOutlined } from "@ant-design/icons";
import { MenuItem } from "../workspace/menu";

export function getContentsMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        icon: <span><ContentsContextMenu path={menu.path}><FormOutlined /></ContentsContextMenu></span>,
        label: <ContentsContextMenu path={menu.path}>Contents</ContentsContextMenu>,
        key: menu.type,
    }
}

export function getContentCollectionMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <ContentsContextMenu path={menu.path}>{menu.name}</ContentsContextMenu>,
        key: menu.type,
    }
}