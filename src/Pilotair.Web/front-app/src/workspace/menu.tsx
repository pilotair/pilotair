import { useMemo, useState } from "react";
import { MenuItem, useMenu } from "./use-menu";
import { Menu as AntdMenu, GetProps } from "antd";
import { useTab } from "./use-tab";
import { ReloadOutlined } from "@ant-design/icons";

type MenuItems = GetProps<typeof AntdMenu>["items"];

export default function Menu() {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { openTab, activeName } = useTab();
  const { menus } = useMenu();

  const expandMenus = useMemo(() => {
    const result: typeof menus = [];

    function getMenus(items: typeof menus) {
      for (const menu of items) {
        result.push(menu);
        if (menu.children) {
          getMenus(menu.children);
        }
      }
    }

    getMenus(menus);
    return result;
  }, [menus]);

  function handleMenuItemClick(key: string) {
    const menu = expandMenus.find((f) => f.key == key);
    if (!menu || !menu.tab) return;
    openTab({
      name: key,
      label: menu.tabLabel ?? menu.label,
      panel: menu.tab,
      icon: menu.tabIcon ?? menu.icon,
      contextMenu: {
        items: [
          {
            label: <span>Reload</span>,
            key: "reload",
            icon: <ReloadOutlined />,
          },
        ],
      },
    });
  }

  return (
    <AntdMenu
      mode="inline"
      items={getItems(menus)}
      onClick={({ key }) => handleMenuItemClick(key)}
      selectedKeys={[activeName]}
      theme="dark"
      inlineIndent={12}
      openKeys={openKeys}
      onOpenChange={(keys: string[]) => setOpenKeys(keys)}
    />
  );
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
    });
  }

  return result;
}
