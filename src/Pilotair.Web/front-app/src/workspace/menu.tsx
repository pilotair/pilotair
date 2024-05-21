import { ReactNode, useEffect } from "react"
import { atom, useAtom } from "jotai"
import { httpClient } from "../utils/request"
import { Pilotair } from "../schema"
import { getCodeFolderMenu, getCodeMenu, getCodesMenu } from "../code/code-menu"
import { ControlOutlined, FolderOutlined, FormOutlined } from "@ant-design/icons"
import AsyncComponent from "../common/async-component"

export type MenuItem = {
    key: string,
    icon?: ReactNode,
    label: ReactNode,
    children?: MenuItem[],
    className?: string,
    tab?: ReactNode
}

const menusAtom = atom<MenuItem[]>([])

export function useMenu() {
    const [menus, setMenus] = useAtom(menusAtom)

    async function loadMenus() {
        const response = await httpClient.get<Pilotair.Web.MenuItem[]>("/__api__/menu");
        setMenus(mapMenuItems(response ?? []) ?? []);

    }

    useEffect(() => {
        loadMenus();
    }, [])

    return {
        menus,
        loadMenus
    }
}

function mapMenuItems(items: Pilotair.Web.MenuItem[]) {
    const result: MenuItem[] = [];

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
                tab: <AsyncComponent component={() => import("../files/page")} />
            };
        case "Contents":
            return {
                key: menu.type,
                label: "Contents",
                icon: <FormOutlined />
            };
        case "Options":
            return {
                key: menu.type,
                label: "Contents",
                icon: <ControlOutlined />
            };
        default:
            return;
    }
}