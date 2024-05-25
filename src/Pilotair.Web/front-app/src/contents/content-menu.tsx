import { Pilotair } from "../schema";
import ContentsContextMenu from "./contents-context-menu";
import { FormOutlined } from "@ant-design/icons";
import { MenuItem } from "../workspace/menu";
import ContentContextMenu from "./content-context-menu";
import AsyncComponent from "../common/async-component";

export function getContentsMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        icon: <span><ContentsContextMenu path={menu.path}><FormOutlined /></ContentsContextMenu></span>,
        label: <ContentsContextMenu path={menu.path}>Contents</ContentsContextMenu>,
        key: menu.type,
    }
}

export function getContentCollectionMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <ContentContextMenu path={menu.path} name={menu.name}>{menu.display || menu.name}</ContentContextMenu>,
        key: menu.path,
        tab: <AsyncComponent component={() => import("./contents")} props={{
            name: menu.name,
            display: menu.display
        }} />,
        tabIcon: <FormOutlined />,
        tabLabel: menu.display || menu.name
    }
}