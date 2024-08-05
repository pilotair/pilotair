import { ReactNode } from "react";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";

interface Props {
  children: ReactNode;
  path: string;
}

export default function CodeContextMenu({ children, path }: Props) {
  const { loadMenus } = useMenu();
  const { httpDelete } = useHttpClient();

  const items: MenuItem[] = [
    {
      key: "delete",
      async onClick() {
        await httpDelete("code", {
          paths: [path],
        });
        loadMenus();
      },
    },
  ];

  return (
    <ContextMenu items={items}>
      <div>{children}</div>
    </ContextMenu>
  );
}
