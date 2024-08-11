import { FormOutlined } from "@ant-design/icons";
import { ReactNode, useContext } from "react";
import AsyncComponent from "@/common/basic/async-component";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";
import { tabKeyTypes } from "@/common/tab/utils";
import { TabsContext } from "../main-tabs";

interface Props {
  children: ReactNode;
  path: string;
}

export default function ContentsContextMenu({ children, path }: Props) {
  const { openTab } = useContext(TabsContext);

  function handleNew() {
    openTab({
      name: path,
      type: tabKeyTypes.new,
      label: "New collection",
      panel: <AsyncComponent component={() => import("./new-collection")} />,
      icon: <FormOutlined />,
    });
  }

  const items: MenuItem[] = [
    { key: MenuItemKeys.new, label: "New Collection", onClick: handleNew },
  ];

  return (
    <ContextMenu items={items}>
      <div>{children}</div>
    </ContextMenu>
  );
}
