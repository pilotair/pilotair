import { FormOutlined } from "@ant-design/icons";
import { useHttpClient } from "@/utils/http/use-client";
import AsyncComponent from "@/common/basic/async-component";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";
import { useEvent } from "@/common/events/event";
import { deleteMenu, reloadMenus } from "@/common/events/sources";
import { Pilotair } from "@/schema";
import { ChildrenProps } from "@/common/types";
import { tabKeyTypes } from "@/common/tab/utils";
import { useContext } from "react";
import { TabsContext } from "../main-tabs";

interface Props extends ChildrenProps {
  menu: Pilotair.Menus.MenuItem;
}

export default function CollectionContextMenu({ children, menu }: Props) {
  const { openTab } = useContext(TabsContext);
  const { httpDelete } = useHttpClient();
  const emitDeleteMenu = useEvent(deleteMenu);
  const emitReloadMenus = useEvent(reloadMenus);

  function handleEdit() {
    openTab({
      name: menu.path,
      type: tabKeyTypes.edit,
      label: `Edit ${menu.display || menu.name}`,
      panel: (
        <AsyncComponent
          component={() => import("./edit-collection")}
          props={{ name: menu.name }}
        />
      ),
      icon: <FormOutlined />,
    });
  }

  async function handleDelete() {
    await httpDelete(`content-collection?name=${menu.name}`);
    emitReloadMenus();
    emitDeleteMenu(menu.path);
  }

  const items: MenuItem[] = [
    { key: MenuItemKeys.edit, label: "Edit Collection", onClick: handleEdit },
    { key: MenuItemKeys.delete, onClick: handleDelete },
  ];

  return (
    <ContextMenu items={items}>
      <div>{children}</div>
    </ContextMenu>
  );
}
