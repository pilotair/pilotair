import { FormOutlined } from "@ant-design/icons";
import { useHttpClient } from "@/utils/http/use-client";
import { useTab } from "@/workspace/use-tab";
import AsyncComponent from "@/common/basic/async-component";
import { combine } from "@/utils/path";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";
import { useEvent } from "@/common/events/event";
import { deleteContentCollection, reloadMenus } from "@/common/events/sources";
import { Pilotair } from "@/schema";
import { ChildrenProps } from "@/common/types";

interface Props extends ChildrenProps {
  menu: Pilotair.Web.MenuItem;
}

export default function CollectionContextMenu({ children, menu }: Props) {
  const { openTab } = useTab();
  const { httpClient } = useHttpClient();
  const emitReloadMenus = useEvent(reloadMenus);
  const emitDeleteContentCollection = useEvent(deleteContentCollection);
  const path = combine("edit", menu.path);

  function handleEdit() {
    openTab({
      name: path,
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
    await httpClient.delete(`content-collection?name=${menu.name}`);
    emitReloadMenus();
    emitDeleteContentCollection(menu.name);
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
