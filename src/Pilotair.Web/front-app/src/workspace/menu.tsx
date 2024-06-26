import { useMemo, useState } from "react";
import { MenuItem, useMenu } from "./use-menu";
import { Menu as AntdMenu, GetProps } from "antd"
import { useTabs } from "./tabs";

type MenuItems = GetProps<typeof AntdMenu>["items"]

export default function Menu() {
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const { openTab, activeName } = useTabs();
    const { menus } = useMenu();

    const expandMenus = useMemo(() => {
        const result: typeof menus = []

        function getMenus(items: typeof menus) {
            for (const menu of items) {
                result.push(menu);
                if (menu.children) {
                    getMenus(menu.children)
                }
            }
        }

        getMenus(menus)
        return result;
    }, [menus])

    function onMenuItemClick(key: string) {
        const menu = expandMenus.find(f => f.key == key);
        if (!menu || !menu.tab) return;
        openTab(key, menu.tabLabel ?? menu.label, menu.tab, menu.tabIcon ?? menu.icon)
    }

    return <AntdMenu
        mode="inline"
        items={getItems(menus)}
        onClick={({ key }) => onMenuItemClick(key)}
        selectedKeys={[activeName]}
        theme="dark"
        inlineIndent={12}
        openKeys={openKeys}
        onOpenChange={(keys: string[]) => setOpenKeys(keys)}
    />
}

function getItems(menus?: MenuItem[]): MenuItems | undefined {
    if (!menus || !menus.length) return undefined;
    const result: MenuItems = [];

    for (const i of menus) {
        result.push({
            label: i.label,
            children: getItems(i.children),
            className: i.className,
            icon: i.icon,
            key: i.key,
        })
    }

    return result;
}