import { ReactNode, useCallback } from "react";
import { atom, useAtom } from "jotai";
import { useHttpClient } from "../utils/http/use-client";
import { Pilotair } from "../schema";
import { getCodeFolderMenu, getCodeMenu, getCodesMenu } from "./code/code-menu";
import { ControlOutlined, FolderOutlined } from "@ant-design/icons";
import AsyncComponent from "@/common/basic/async-component";
import {
  getCollectionMenu,
  getCollectionsMenu,
} from "./contents/collection-menu";

export type MenuItem = {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  children?: MenuItem[];
  className?: string;
  tab?: ReactNode;
  tabLabel?: ReactNode;
  tabIcon?: ReactNode;
};

const menusAtom = atom<MenuItem[]>([]);

export function useMenu() {
  const [menus, setMenus] = useAtom(menusAtom);
  const { httpGet } = useHttpClient();

  const loadMenus = useCallback(async () => {
    const response = await httpGet<Pilotair.Web.MenuItem[]>("menu");
    setMenus(mapMenuItems(response ?? []) ?? []);
  }, []);

  return {
    menus,
    loadMenus,
  };
}

function mapMenuItems(items: Pilotair.Web.MenuItem[]) {
  const result: MenuItem[] = [];
  items = items.sort((left, right) => left.order - right.order);

  for (const item of items) {
    const menu = getMenu(item);
    if (!menu) continue;
    result.push(menu);
    if (item.children) {
      menu.children = mapMenuItems(item.children);
    }
  }

  return result.length ? result : undefined;
}

function getMenu(menu: Pilotair.Web.MenuItem): MenuItem | undefined {
  switch (menu.type) {
    case "Files":
      return {
        key: menu.path,
        label: "Files",
        icon: <FolderOutlined />,
        tab: <AsyncComponent component={() => import("./files/page")} />,
      };
    case "Contents":
      return getCollectionsMenu(menu);
    case "ContentCollection":
      return getCollectionMenu(menu);
    case "Codes":
      return getCodesMenu(menu);
    case "CodeFolder":
      return getCodeFolderMenu(menu);
    case "Code":
      return getCodeMenu(menu);
    case "Options":
      return {
        key: menu.path,
        label: "Options",
        icon: <ControlOutlined />,
      };
    default:
      return;
  }
}
