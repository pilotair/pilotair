import { Pilotair } from "@/schema";
import CollectionsContextMenu from "./collections-context-menu";
import { FormOutlined } from "@ant-design/icons";
import { MenuItem } from "@/workspace/use-menu";
import CollectionContextMenu from "./collection-context-menu";
import AsyncComponent from "@/common/basic/async-component";

export function getCollectionsMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        icon: <span><CollectionsContextMenu path={menu.path}><FormOutlined /></CollectionsContextMenu></span>,
        label: <CollectionsContextMenu path={menu.path}>Contents</CollectionsContextMenu>,
        key: menu.type,
    }
}

export function getCollectionMenu(menu: Pilotair.Web.MenuItem): MenuItem {
    return {
        label: <CollectionContextMenu path={menu.path} name={menu.name}>
            {menu.display || menu.name}
        </CollectionContextMenu>,
        key: menu.path,
        tab: <AsyncComponent component={() => import("./contents")} props={{
            name: menu.name,
            display: menu.display,
            path: menu.path
        }} />,
        tabIcon: <FormOutlined />,
        tabLabel: menu.display || menu.name
    }
}