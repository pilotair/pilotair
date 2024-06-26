import { ReactNode, useCallback, useEffect } from "react"
import { atom, useAtom } from "jotai"
import { httpClient } from "../utils/request"
import { Pilotair } from "../schema"
import { getCodeFolderMenu, getCodeMenu, getCodesMenu } from "./code/code-menu"
import { ControlOutlined, FolderOutlined } from "@ant-design/icons"
import AsyncComponent from "../common/async-component"
import { getContentCollectionMenu, getContentsMenu } from "./contents/content-menu"

export type MenuItem = {
    key: string,
    icon?: ReactNode,
    label: ReactNode,
    children?: MenuItem[],
    className?: string,
    tab?: ReactNode,
    tabLabel?: ReactNode,
    tabIcon?: ReactNode,
}

const menusAtom = atom<MenuItem[]>([])

export function useMenu() {
    const [menus, setMenus] = useAtom(menusAtom)

    const loadMenus = useCallback(async () => {
        const response = await httpClient.get<Pilotair.Web.MenuItem[]>("menu");
        setMenus(mapMenuItems(response ?? []) ?? []);
    }, [])

    useEffect(() => {
        loadMenus();
    }, [loadMenus])

    return {
        menus,
        loadMenus
    }
}

function mapMenuItems(items: Pilotair.Web.MenuItem[]) {
    const result: MenuItem[] = [];
    items = items.sort((left, right) => left.order - right.order)

    for (const item of items) {
        const menu = getMenu(item);
        if (!menu) continue;
        result.push(menu)
        if (item.children) {
            menu.children = mapMenuItems(item.children)
        }
    }

    return result.length ? result : undefined;
}

function getMenu(menu: Pilotair.Web.MenuItem): MenuItem | undefined {
    switch (menu.type) {
        case "Codes":
            return getCodesMenu(menu);
        case "CodeFolder":
            return getCodeFolderMenu(menu);
        case "Code":
            return getCodeMenu(menu);
        case "Files":
            return {
                key: menu.type,
                label: "Files",
                icon: <FolderOutlined />,
                tab: <AsyncComponent component={() => import("./files/page")} />,
            };
        case "Contents":
            return getContentsMenu(menu)
        case "ContentCollection":
            return getContentCollectionMenu(menu)
        case "Options":
            return {
                key: menu.type,
                label: "Options",
                icon: <ControlOutlined />,
            };
        default:
            return;
    }
}