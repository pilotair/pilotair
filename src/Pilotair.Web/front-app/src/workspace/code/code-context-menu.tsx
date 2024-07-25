import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";

interface Props {
  children: ReactNode;
  path: string;
}

export default function CodeContextMenu({ children, path }: Props) {
  const { loadMenus } = useMenu();
  const { httpClient } = useHttpClient();

  async function handleItemClick({
    key,
    domEvent,
  }: Parameters<NonNullable<MenuProps["onClick"]>>[0]) {
    domEvent.stopPropagation();

    switch (key) {
      case "delete":
        await httpClient.delete("code", {
          paths: [path],
        });
        loadMenus();
        break;
      default:
        break;
    }
  }

  const menu: MenuProps = {
    items: [
      {
        key: "delete",
        label: <span>Delete</span>,
        icon: <DeleteOutlined />,
        title: "",
        danger: true,
      },
    ],
    onClick: handleItemClick,
  };

  return (
    <Dropdown trigger={["contextMenu"]} menu={menu}>
      <div>{children}</div>
    </Dropdown>
  );
}
