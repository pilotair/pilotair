import { Pilotair } from "@/schema";
import ContentsContextMenu from "./contents-context-menu";
import { FormOutlined } from "@ant-design/icons";
import { MenuItem } from "@/workspace/use-menu";
import CollectionContextMenu from "./collection-context-menu";
import AsyncComponent from "@/common/basic/async-component";

export function getCollectionsMenu(menu: Pilotair.Web.MenuItem): MenuItem {
  return {
    icon: (
      <span>
        <ContentsContextMenu path={menu.path}>
          <FormOutlined />
        </ContentsContextMenu>
      </span>
    ),
    label: <ContentsContextMenu path={menu.path}>Contents</ContentsContextMenu>,
    key: menu.type,
  };
}

export function getCollectionMenu(menu: Pilotair.Web.MenuItem): MenuItem {
  const name = menu.display || menu.name;
  return {
    label: <CollectionContextMenu menu={menu}>{name}</CollectionContextMenu>,
    key: menu.path,
    tab: (
      <AsyncComponent
        component={() => import("./contents")}
        props={{
          name: menu.name,
          display: menu.display,
          path: menu.path,
        }}
      />
    ),
    tabIcon: <FormOutlined />,
    tabLabel: `${name} list`,
  };
}
