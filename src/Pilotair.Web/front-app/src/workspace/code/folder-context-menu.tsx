import { FolderAddOutlined } from "@ant-design/icons";
import { ReactNode, useContext } from "react";
import { ModalContext } from "@/common/modals/context";
import { useNewFolderModal } from "./use-new-folder-modal";
import CreateFileForm from "./create-file-form";
import { useHttpClient } from "@/utils/http/use-client";
import { useMenu } from "@/workspace/use-menu";
import ContextMenu, { MenuItem } from "@/common/menus/context-menu";
import { MenuItemKeys } from "@/common/menus/constants";

interface Props {
  children: ReactNode;
  path: string;
}

export default function FolderContextMenu({ children, path }: Props) {
  const { open } = useContext(ModalContext);
  const openNewFolderModal = useNewFolderModal();
  const { loadMenus } = useMenu();
  const { httpDelete } = useHttpClient();

  const items: MenuItem[] = [
    {
      key: MenuItemKeys.edit,
      label: <div>New file</div>,
      onClick() {
        open({
          title: "Create file",
          children: <CreateFileForm path={path} />,
        });
      },
    },
    {
      key: "folder",
      label: "New folder",
      icon: <FolderAddOutlined />,
      title: "",
      onClick() {
        openNewFolderModal();
      },
    },
    {
      key: MenuItemKeys.delete,
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
